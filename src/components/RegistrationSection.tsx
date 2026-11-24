import { useState, type FormEvent } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  Mail,
  MessageCircle,
  Send,
} from 'lucide-react';
import { motion } from 'motion/react';
import { WORKSHOP_LOGISTICS } from '../data/workshop';
import { createClientRegistration } from '../utils/registration';
import type { RegistrationData } from './PaymentPreviewModal';

interface RegistrationSectionProps {
  onRegistered: (record: RegistrationData) => void;
  onOpenPaymentModal: (record: RegistrationData) => void;
  activeRegistration: RegistrationData | null;
  onResetRegistration: () => void;
}

const COUNTRY_CODES = [
  { code: '+57', label: 'CO +57' },
  { code: '+52', label: 'MX +52' },
  { code: '+34', label: 'ES +34' },
  { code: '+54', label: 'AR +54' },
  { code: '+51', label: 'PE +51' },
  { code: '+56', label: 'CL +56' },
  { code: '+1', label: 'US +1' },
];

export function RegistrationSection({
  onRegistered,
  onOpenPaymentModal,
  activeRegistration,
  onResetRegistration,
}: RegistrationSectionProps) {
  const [plan, setPlan] = useState<'preventa' | 'general'>('preventa');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+57');
  const [whatsapp, setWhatsapp] = useState('');
  const [profile, setProfile] = useState('Emprendedor / Marca personal');
  const [deliveryChannel, setDeliveryChannel] = useState<'both' | 'email' | 'whatsapp'>('both');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  function selectPlanAndFocus(selected: 'preventa' | 'general') {
    setPlan(selected);
    const input = document.getElementById('reg-name');
    if (input) {
      input.focus({ preventScroll: false });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (fullName.trim().length < 2) {
      setError('Escribe tu nombre completo para generar tu registro.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Ingresa un correo electrónico válido para enviarte el link.');
      return;
    }

    const digits = whatsapp.replace(/[^\d]/g, '');
    if (digits.length < 7) {
      setError('Ingresa un número de WhatsApp válido (mínimo 7 dígitos).');
      return;
    }

    setSubmitting(true);
    try {
      const registration = createClientRegistration({
        fullName: fullName.trim(),
        email: email.trim(),
        countryCode,
        whatsapp: digits,
        profile,
        plan,
        deliveryChannel,
      });
      onRegistered(registration);
    } catch {
      setError('Ocurrió un error al generar tu enlace de WhatsApp. Inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCopyLink(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2200);
    } catch {
      setCopiedLink(false);
    }
  }

  const targetWhatsappNumber = WORKSHOP_LOGISTICS.organizerWhatsappNumber || '573102183451';

  const whatsappHref = activeRegistration
    ? activeRegistration.paymentUrl.startsWith('https://wa.me/')
      ? activeRegistration.paymentUrl
      : `https://wa.me/${targetWhatsappNumber}?text=${encodeURIComponent(
          `Hola, acabo de registrarme al workshop CREA, EDITA Y CONECTA (3, 4 y 5 de diciembre · 6:00 p. m.) y quiero recibir mi link de pago.\nFolio: ${activeRegistration.folio}\nNombre: ${activeRegistration.fullName}\nTarifa: ${activeRegistration.planLabel} ($${activeRegistration.amountCop.toLocaleString('es-CO')} COP)`
        )}`
    : '#';

  const effectivePaymentHref = activeRegistration ? whatsappHref : '#';

  return (
    <section
      id="inversion"
      className="mx-auto max-w-6xl border-t border-white/10 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl"
      >
        <p className="text-sm font-semibold text-[#FF5D8F]">Inversión e inscripciones</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#F4F6FB] text-balance sm:text-4xl">
          Aprovecha la promoción de Black Friday y asegura tu cupo
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[#B8C0D9]">
          Sesiones los días <span className="font-semibold text-[#F4F6FB]">3, 4 y 5 de diciembre a las 6:00 p. m.</span>{' '}
          Promoción Black Friday del 21 al 28 de noviembre por{' '}
          <span className="font-bold text-[#12D6EB]">$100.000 COP</span> (precio regular $180.000
          COP).
        </p>
      </motion.div>

      <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* Left: Pricing Tiers (PREVENTA featured prominently) */}
        <div className="space-y-5 lg:col-span-5">
          {/* PREVENTA CARD (Dominant Visual Prominence) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className={`rounded-2xl border-2 p-6 sm:p-7 transition-colors ${
              plan === 'preventa'
                ? 'border-[#12D6EB] bg-[#181B33]'
                : 'border-[#7C6BF5]/60 bg-[#15172C]'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs font-bold tracking-wider text-[#FF5D8F]">
                BLACK FRIDAY · 21 AL 28 DE NOVIEMBRE
              </span>
              {plan === 'preventa' && (
                <span className="text-xs font-semibold text-[#12D6EB]">Seleccionada</span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-4xl font-extrabold tracking-tight text-white tabular-nums sm:text-5xl">
                $100.000
              </span>
              <span className="font-mono text-sm font-semibold text-[#B8C0D9]">COP</span>
              <span className="font-mono text-sm text-[#8D96B5] line-through tabular-nums">
                $180.000 COP
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-[#D6DCF0]">
              Acceso completo al workshop práctico Crea, Edita y Conecta los días 3, 4 y 5 de
              diciembre a las 6:00 p. m.
            </p>

            <ul className="mt-5 space-y-2 text-xs text-[#E3E8F6]">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-[#12D6EB]" />
                <span>Módulo 1 CREA · Módulo 2 EDITA · Módulo 3 CONECTA</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-[#12D6EB]" />
                <span>Ahorro de $80.000 COP vigente del 21 al 28 de noviembre</span>
              </li>
            </ul>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => selectPlanAndFocus('preventa')}
              className="mt-6 w-full rounded-lg bg-[#12D6EB] px-5 py-3.5 text-xs font-bold tracking-wide text-[#07101C] transition-colors duration-150 hover:bg-[#3CE1F2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              APROVECHAR PRECIO DE PREVENTA
            </motion.button>
          </motion.div>

          {/* PRECIO REGULAR CARD */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3 }}
            className={`rounded-2xl border p-6 transition-colors ${
              plan === 'general'
                ? 'border-[#12D6EB] bg-[#181B33]'
                : 'border-white/10 bg-[#131526]/80'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs font-semibold text-[#9BA4C2]">
                PRECIO REGULAR
              </span>
              {plan === 'general' && (
                <span className="text-xs font-semibold text-[#12D6EB]">Seleccionada</span>
              )}
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-extrabold text-[#F4F6FB] tabular-nums">
                $180.000
              </span>
              <span className="font-mono text-xs font-semibold text-[#9BA4C2]">COP</span>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-[#B8C0D9]">
              Tarifa regular del workshop práctico Crea, Edita y Conecta una vez finalizada la
              promoción de Black Friday el sábado 28 de noviembre.
            </p>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => selectPlanAndFocus('general')}
              className="mt-5 w-full rounded-lg border border-white/20 bg-white/[0.04] px-4 py-3 text-xs font-bold tracking-wide text-[#F4F6FB] transition-colors duration-150 hover:border-[#12D6EB] hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-[#12D6EB]"
            >
              QUIERO MI CUPO
            </motion.button>
          </motion.div>
        </div>

        {/* Right: Registration Form & Payment Link / WhatsApp Dispatch */}
        <motion.div
          id="registro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-white/10 bg-[#131526]/95 p-6 sm:p-8 lg:col-span-7"
        >
          {activeRegistration ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <p className="font-mono text-xs font-semibold text-[#2DD48F]">
                    {activeRegistration.status === 'paid'
                      ? 'CUPO CONFIRMADO'
                      : 'PRE-INSCRIPCIÓN GENERADA'}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-extrabold text-[#F4F6FB]">
                    ¡Gracias, {activeRegistration.fullName.split(' ')[0]}! Tu enlace está listo
                  </h3>
                </div>
                <span className="font-mono text-sm font-bold text-[#12D6EB] tabular-nums">
                  {activeRegistration.folio}
                </span>
              </div>

              <div className="grid gap-3 rounded-xl border border-white/10 bg-[#0B0C18]/80 p-4 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-xs text-[#8D96B5]">Tarifa seleccionada</p>
                  <p className="mt-0.5 font-bold text-[#F4F6FB]">
                    {activeRegistration.planLabel} · $
                    {activeRegistration.amountCop.toLocaleString('es-CO')} COP
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#8D96B5]">Canal de entrega</p>
                  <p className="mt-0.5 font-medium text-[#F4F6FB]">
                    {activeRegistration.deliveryChannel === 'both' && 'Correo electrónico y WhatsApp'}
                    {activeRegistration.deliveryChannel === 'email' && 'Correo electrónico'}
                    {activeRegistration.deliveryChannel === 'whatsapp' && 'WhatsApp'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#8D96B5]">Correo</p>
                  <p className="mt-0.5 truncate text-[#D6DCF0]">{activeRegistration.email}</p>
                </div>
                <div>
                  <p className="text-xs text-[#8D96B5]">WhatsApp</p>
                  <p className="mt-0.5 font-mono text-xs text-[#D6DCF0] tabular-nums">
                    {activeRegistration.countryCode} {activeRegistration.whatsapp}
                  </p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="generated-payment-url"
                  className="block text-xs font-semibold text-[#B8C0D9]"
                >
                  Tu enlace directo al chat de WhatsApp (310 218 3451) para recibir el link de pago
                </label>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                  <input
                    id="generated-payment-url"
                    type="text"
                    readOnly
                    value={effectivePaymentHref}
                    className="flex-1 rounded-lg border border-white/15 bg-[#0B0C18] px-3.5 py-2.5 font-mono text-xs text-[#12D6EB] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleCopyLink(effectivePaymentHref)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-bold text-[#F4F6FB] whitespace-nowrap shrink-0 transition-colors hover:bg-white/10"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="h-4 w-4 text-[#2DD48F]" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copiar link
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#12D6EB] px-5 py-3 text-xs font-bold tracking-wide text-[#07101C] transition-colors hover:bg-[#3CE1F2]"
                >
                  <MessageCircle className="h-4 w-4" />
                  IR AL CHAT DE WHATSAPP (310 218 3451)
                </a>

                <button
                  type="button"
                  onClick={() => onOpenPaymentModal(activeRegistration)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-[#0B0C18] px-4 py-3 text-xs font-bold text-[#F4F6FB] transition-colors hover:border-white/30"
                >
                  <ExternalLink className="h-4 w-4 text-[#FF5D8F]" />
                  {activeRegistration.status === 'paid'
                    ? 'VER COMPROBANTE'
                    : 'VER RESUMEN DE RESERVA'}
                </button>

                <button
                  type="button"
                  onClick={onResetRegistration}
                  className="ml-auto text-xs font-medium text-[#8D96B5] underline underline-offset-4 hover:text-[#F4F6FB]"
                >
                  Registrar otra persona
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="border-b border-white/10 pb-4">
                <h3 className="font-display text-xl font-extrabold text-[#F4F6FB]">
                  Completa tu registro para recibir el link de pago
                </h3>
                <p className="mt-1 text-xs text-[#9BA4C2]">
                  Tarifa activa:{' '}
                  <span className="font-bold text-[#12D6EB]">
                    {plan === 'preventa'
                      ? 'BLACK FRIDAY (21–28 nov) — $100.000 COP'
                      : 'PRECIO REGULAR — $180.000 COP'}
                  </span>
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="reg-name" className="block text-xs font-semibold text-[#D6DCF0]">
                    Nombre completo
                  </label>
                  <input
                    id="reg-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej. Laura Martínez"
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0B0C18] px-3.5 py-2.5 text-sm text-[#F4F6FB] placeholder:text-[#66708F] focus:border-[#12D6EB] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="reg-email" className="block text-xs font-semibold text-[#D6DCF0]">
                    Correo electrónico
                  </label>
                  <div className="relative mt-1.5">
                    <Mail className="pointer-events-none absolute top-3 left-3 h-4 w-4 text-[#66708F]" />
                    <input
                      id="reg-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      className="w-full rounded-lg border border-white/15 bg-[#0B0C18] py-2.5 pr-3.5 pl-9 text-sm text-[#F4F6FB] placeholder:text-[#66708F] focus:border-[#12D6EB] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="reg-whatsapp"
                    className="block text-xs font-semibold text-[#D6DCF0]"
                  >
                    WhatsApp
                  </label>
                  <div className="mt-1.5 flex gap-2">
                    <select
                      aria-label="Código de país"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="rounded-lg border border-white/15 bg-[#0B0C18] px-2.5 py-2.5 text-xs font-medium text-[#F4F6FB] focus:border-[#12D6EB] focus:outline-none"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <input
                      id="reg-whatsapp"
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="300 123 4567"
                      className="w-full min-w-0 flex-1 rounded-lg border border-white/15 bg-[#0B0C18] px-3.5 py-2.5 text-sm text-[#F4F6FB] placeholder:text-[#66708F] focus:border-[#12D6EB] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="reg-profile"
                    className="block text-xs font-semibold text-[#D6DCF0]"
                  >
                    ¿Cómo te identificas mejor?
                  </label>
                  <select
                    id="reg-profile"
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0B0C18] px-3.5 py-2.5 text-sm text-[#F4F6FB] focus:border-[#12D6EB] focus:outline-none"
                  >
                    <option value="Emprendedor / Marca personal">Emprendedor / Marca personal</option>
                    <option value="Quiero comenzar a crear contenido">
                      Quiero comenzar a crear contenido
                    </option>
                    <option value="Creador buscando mejorar calidad">
                      Creador buscando mejorar calidad
                    </option>
                    <option value="Sin experiencia previa">Sin experiencia previa</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="reg-delivery"
                    className="block text-xs font-semibold text-[#D6DCF0]"
                  >
                    ¿Dónde quieres recibir tu link?
                  </label>
                  <select
                    id="reg-delivery"
                    value={deliveryChannel}
                    onChange={(e) =>
                      setDeliveryChannel(e.target.value as 'both' | 'email' | 'whatsapp')
                    }
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0B0C18] px-3.5 py-2.5 text-sm text-[#F4F6FB] focus:border-[#12D6EB] focus:outline-none"
                  >
                    <option value="both">Correo electrónico y WhatsApp</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="email">Correo electrónico</option>
                  </select>
                </div>
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-lg border border-[#FF5D8F]/40 bg-[#FF5D8F]/10 px-4 py-2.5 text-xs font-medium text-[#FFB3CA]"
                >
                  {error}
                </p>
              )}

              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.15 }}
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#12D6EB] px-6 py-3.5 text-xs font-bold tracking-wide text-[#07101C] transition-colors duration-150 hover:bg-[#3CE1F2] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12D6EB]"
              >
                <Send className="h-4 w-4" />
                {submitting ? 'GENERANDO TU ENLACE...' : 'INSCRIBIRME AHORA'}
              </motion.button>

              <p className="text-center text-xs text-[#8D96B5]">
                Al enviar tus datos generamos tu enlace de pago y la opción de confirmación directa
                por WhatsApp.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
