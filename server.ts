import crypto from 'crypto';
import dotenv from 'dotenv';
import express from 'express';
import type { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'data');
const REGISTRATIONS_FILE = path.join(DATA_DIR, 'registrations.json');

interface RegistrationRecord {
  id: string;
  folio: string;
  fullName: string;
  email: string;
  countryCode: string;
  whatsapp: string;
  profile: string;
  plan: 'preventa' | 'general';
  planLabel: string;
  amountCop: number;
  deliveryChannel: 'both' | 'email' | 'whatsapp';
  paymentUrl: string;
  status: 'pending_payment' | 'paid';
  createdAt: string;
}

const PLAN_PRICING: Record<'preventa' | 'general', { label: string; amountCop: number }> = {
  preventa: { label: 'Black Friday (21–28 nov)', amountCop: 100000 },
  general: { label: 'Precio Regular', amountCop: 180000 },
};

function readRegistrations(): RegistrationRecord[] {
  try {
    if (!fs.existsSync(REGISTRATIONS_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(REGISTRATIONS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRegistrations(records: RegistrationRecord[]): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(records, null, 2), 'utf-8');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizePhone(phone: string): string {
  return phone.replace(/[^\d]/g, '');
}

async function startServer() {
  const app = express();
  app.use(express.json());

  app.get('/api/workshop-info', (_req: Request, res: Response) => {
    res.json({
      plans: PLAN_PRICING,
      logistics: {
        fecha: '3, 4 y 5 de diciembre',
        horario: '6:00 p. m.',
        modalidad: 'Virtual',
      },
    });
  });

  app.post('/api/register', (req: Request, res: Response) => {
    const {
      fullName,
      email,
      countryCode,
      whatsapp,
      profile,
      plan,
      deliveryChannel,
    } = req.body ?? {};

    if (typeof fullName !== 'string' || fullName.trim().length < 2) {
      res.status(400).json({ error: 'Ingresa tu nombre completo para generar tu registro.' });
      return;
    }

    if (typeof email !== 'string' || !isValidEmail(email.trim())) {
      res.status(400).json({ error: 'Ingresa un correo electrónico válido.' });
      return;
    }

    const cleanPhone = typeof whatsapp === 'string' ? normalizePhone(whatsapp) : '';
    if (cleanPhone.length < 7 || cleanPhone.length > 15) {
      res.status(400).json({ error: 'Ingresa un número de WhatsApp válido (entre 7 y 15 dígitos).' });
      return;
    }

    const safePlan: 'preventa' | 'general' = plan === 'general' ? 'general' : 'preventa';
    const allowedChannels = ['both', 'email', 'whatsapp'] as const;
    const safeChannel = allowedChannels.includes(deliveryChannel) ? deliveryChannel : 'both';
    const safeCountryCode =
      typeof countryCode === 'string' && countryCode.startsWith('+') ? countryCode : '+57';
    const safeProfile =
      typeof profile === 'string' && profile.trim().length > 0
        ? profile.trim()
        : 'Emprendedor / Marca personal';

    const records = readRegistrations();
    const randomSuffix = crypto.randomInt(1000, 9999);
    const folio = `CEC-${randomSuffix}`;
    const id = crypto.randomUUID();
    const planDetails = PLAN_PRICING[safePlan];

    const ORGANIZER_WHATSAPP = '573102183451';
    const formattedPrice = `$${planDetails.amountCop.toLocaleString('es-CO')} COP`;
    const whatsappMessage = [
      'Hola, acabo de registrarme al workshop CREA, EDITA Y CONECTA (3, 4 y 5 de diciembre · 6:00 p. m.) y quiero recibir mi link de pago.',
      `Folio: ${folio}`,
      `Nombre: ${fullName.trim()}`,
      `Correo: ${email.trim().toLowerCase()}`,
      `WhatsApp: ${safeCountryCode} ${cleanPhone}`,
      `Perfil: ${safeProfile}`,
      `Tarifa: ${planDetails.label} (${formattedPrice})`,
    ].join('\n');

    const paymentUrl = `https://wa.me/${ORGANIZER_WHATSAPP}?text=${encodeURIComponent(whatsappMessage)}`;

    const newRecord: RegistrationRecord = {
      id,
      folio,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      countryCode: safeCountryCode,
      whatsapp: cleanPhone,
      profile: safeProfile,
      plan: safePlan,
      planLabel: planDetails.label,
      amountCop: planDetails.amountCop,
      deliveryChannel: safeChannel,
      paymentUrl,
      status: 'pending_payment',
      createdAt: new Date().toISOString(),
    };

    records.push(newRecord);
    writeRegistrations(records);

    res.status(201).json({
      registration: newRecord,
    });
  });

  app.get('/api/registration/:folio', (req: Request, res: Response) => {
    const { folio } = req.params;
    const records = readRegistrations();
    const found = records.find((r) => r.folio === folio);
    if (!found) {
      res.status(404).json({ error: 'No encontramos un registro con ese folio.' });
      return;
    }
    res.json({ registration: found });
  });

  app.post('/api/registration/:folio/confirm-payment', (req: Request, res: Response) => {
    const { folio } = req.params;
    const records = readRegistrations();
    const index = records.findIndex((r) => r.folio === folio);
    if (index === -1) {
      res.status(404).json({ error: 'Folio de registro no encontrado.' });
      return;
    }
    records[index] = {
      ...records[index],
      status: 'paid',
    };
    writeRegistrations(records);
    res.json({ registration: records[index] });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer();
