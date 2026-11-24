import { WORKSHOP_LOGISTICS } from '../data/workshop';
import type { RegistrationData } from '../components/PaymentPreviewModal';

const STORAGE_KEY = 'cec_workshop_registration_v1';

export const PLAN_PRICING: Record<'preventa' | 'general', { label: string; amountCop: number }> = {
  preventa: { label: 'Black Friday (21–28 nov)', amountCop: 100000 },
  general: { label: 'Precio Regular', amountCop: 180000 },
};

function generateFolio(): string {
  const arr = new Uint32Array(1);
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(arr);
    const num = 1000 + (arr[0] % 9000);
    return `CEC-${num}`;
  }
  const fallback = Math.floor(1000 + Math.random() * 9000);
  return `CEC-${fallback}`;
}

function generateId(): string {
  if (typeof window !== 'undefined' && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `reg-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export interface CreateRegistrationInput {
  fullName: string;
  email: string;
  countryCode: string;
  whatsapp: string;
  profile: string;
  plan: 'preventa' | 'general';
  deliveryChannel: 'both' | 'email' | 'whatsapp';
}

export function createClientRegistration(input: CreateRegistrationInput): RegistrationData {
  const folio = generateFolio();
  const planDetails = PLAN_PRICING[input.plan];
  const organizerPhone = WORKSHOP_LOGISTICS.organizerWhatsappNumber || '573102183451';
  const formattedPrice = `$${planDetails.amountCop.toLocaleString('es-CO')} COP`;

  const whatsappMessage = [
    `Hola, acabo de registrarme al workshop CREA, EDITA Y CONECTA (${WORKSHOP_LOGISTICS.fecha} · ${WORKSHOP_LOGISTICS.horario} · Modalidad ${WORKSHOP_LOGISTICS.modalidad}) y quiero recibir mi link de pago.`,
    `Folio: ${folio}`,
    `Nombre: ${input.fullName}`,
    `Correo: ${input.email.toLowerCase()}`,
    `WhatsApp: ${input.countryCode} ${input.whatsapp}`,
    `Perfil: ${input.profile}`,
    `Tarifa: ${planDetails.label} (${formattedPrice})`,
  ].join('\n');

  const paymentUrl = `https://wa.me/${organizerPhone}?text=${encodeURIComponent(whatsappMessage)}`;

  const record: RegistrationData = {
    id: generateId(),
    folio,
    fullName: input.fullName,
    email: input.email.toLowerCase(),
    countryCode: input.countryCode,
    whatsapp: input.whatsapp,
    profile: input.profile,
    plan: input.plan,
    planLabel: planDetails.label,
    amountCop: planDetails.amountCop,
    deliveryChannel: input.deliveryChannel,
    paymentUrl,
    status: 'pending_payment',
    createdAt: new Date().toISOString(),
  };

  saveStoredRegistration(record);
  return record;
}

export function saveStoredRegistration(record: RegistrationData | null): void {
  try {
    if (!record) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Ignore storage quota or private browsing errors
  }
}

export function loadStoredRegistration(): RegistrationData | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RegistrationData;
    return parsed && typeof parsed.folio === 'string' ? parsed : null;
  } catch {
    return null;
  }
}
