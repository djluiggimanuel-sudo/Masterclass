import { useState } from 'react';
import { Check, CreditCard, Lock, MessageCircle, ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { saveStoredRegistration } from '../utils/registration';

export interface RegistrationData {
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

interface PaymentPreviewModalProps {
  registration: RegistrationData | null;
  onClose: () => void;
  onPaymentConfirmed: (updated: RegistrationData) => void;
}

function formatCop(amount: number): string {
  return `$${amount.toLocaleString('es-CO')} COP`;
}

export function PaymentPreviewModal({
  registration,
  onClose,
  onPaymentConfirmed,
}: PaymentPreviewModalProps) {
  const [method, setMethod] = useState<'card' | 'pse' | 'transfer'>('card');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!registration) return null;

  const isPaid = registration.status === 'paid';

  function handleConfirmPayment() {
    if (!registration) return;
    setSubmitting(true);
    setError(null);
    const updated: RegistrationData = {
      ...registration,
      status: 'paid',
    };
    saveStoredRegistration(updated);
    onPaymentConfirmed(updated);
    setSubmitting(false);
  }

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#06070F]/80 p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-[#131526] p-6 shadow-2xl sm:p-7"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana de pago"
            className="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-[#B8C0D9] transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-[#12D6EB]"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="pr-8">
            <p className="font-mono text-xs font-semibold text-[#12D6EB]">
              Folio {registration.folio}
            </p>
            <h3
              id="payment-modal-title"
              className="mt-1 font-display text-xl font-extrabold text-[#F4F6FB]"
            >
              Enlace de pago · CREA, EDITA Y CONECTA
            </h3>
            <p className="mt-1 text-sm text-[#B8C0D9]">
              Participante: <span className="font-semibold text-[#F4F6FB]">{registration.fullName}</span>
            </p>
          </div>

          <div className="mt-5 rounded-xl border border-white/10 bg-[#0B0C18] p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-[#F4F6FB]">{registration.planLabel}</p>
                <p className="mt-0.5 text-xs text-[#8D96B5]">{registration.profile}</p>
              </div>
              <p className="font-display text-2xl font-extrabold text-[#12D6EB] tabular-nums">
                {formatCop(registration.amountCop)}
              </p>
            </div>
          </div>

          {isPaid ? (
            <div className="mt-5 rounded-xl border border-[#2DD48F]/35 bg-[#2DD48F]/10 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#2DD48F]" />
                <div>
                  <p className="font-display text-base font-bold text-[#F4F6FB]">
                    Cupo reservado y pago confirmado
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#D6DCF0]">
                    Tu registro quedó confirmado bajo el folio{' '}
                    <span className="font-mono font-semibold text-white">{registration.folio}</span>.
                    Recibirás los detalles logísticos oficiales en{' '}
                    <span className="font-medium text-white">{registration.email}</span>.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-5 w-full rounded-lg bg-[#2DD48F] px-4 py-2.5 text-sm font-bold text-[#07101C] transition-colors hover:bg-[#4AE0A2]"
              >
                Volver a la página del workshop
              </button>
            </div>
          ) : (
            <div className="mt-5 space-y-5">
              <div>
                <p className="text-xs font-semibold text-[#B8C0D9]">
                  Método de pago preparado para conectar con tu pasarela
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {[
                    { id: 'card', label: 'Tarjeta' },
                    { id: 'pse', label: 'PSE / Nequi' },
                    { id: 'transfer', label: 'Transferencia' },
                  ].map((opt) => {
                    const selected = method === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setMethod(opt.id as 'card' | 'pse' | 'transfer')}
                        className={`rounded-lg border px-3 py-2.5 text-xs font-semibold transition-colors ${
                          selected
                            ? 'border-[#12D6EB] bg-[#12D6EB]/15 text-[#F4F6FB]'
                            : 'border-white/10 bg-[#0B0C18] text-[#A5AEC9] hover:border-white/25'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0B0C18]/75 p-4 text-xs leading-relaxed text-[#B8C0D9]">
                {method === 'card' && (
                  <p className="flex items-start gap-2">
                    <CreditCard className="mt-0.5 h-4 w-4 shrink-0 text-[#12D6EB]" />
                    <span>
                      Pago con tarjeta débito o crédito a través de tu pasarela configurada.
                    </span>
                  </p>
                )}
                {method === 'pse' && (
                  <p className="flex items-start gap-2">
                    <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#12D6EB]" />
                    <span>
                      Débito bancario PSE, Nequi o Daviplata en pesos colombianos (COP).
                    </span>
                  </p>
                )}
                {method === 'transfer' && (
                  <p className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#12D6EB]" />
                    <span>
                      Transferencia directa y envío de comprobante vía WhatsApp con tu folio.
                    </span>
                  </p>
                )}
              </div>

              {error && (
                <p className="rounded-lg border border-[#FF5D8F]/40 bg-[#FF5D8F]/10 px-3.5 py-2.5 text-xs text-[#FFB3CA]">
                  {error}
                </p>
              )}

              <div className="flex flex-col gap-2.5">
                <a
                  href={registration.paymentUrl.replace('https://wa.me/573102183451', 'https://wa.me/573188715994')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#12D6EB] px-4 py-3 text-sm font-bold text-[#07101C] transition-colors duration-150 hover:bg-[#3CE1F2]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Solicitar link de pago por WhatsApp (318 871 5994)
                </a>

                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleConfirmPayment}
                  className="w-full rounded-lg border border-white/15 bg-[#0B0C18] px-4 py-2.5 text-xs font-semibold text-[#D6DCF0] transition-colors duration-150 hover:border-white/30 hover:text-white disabled:opacity-60"
                >
                  {submitting
                    ? 'Guardando estado...'
                    : `Marcar como pagado (${formatCop(registration.amountCop)})`}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
