import { useState } from 'react';
import { Calendar, ChevronDown, Clock, Compass, Users, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS, WORKSHOP_LOGISTICS } from '../data/workshop';

const PRACTICE_IMAGE = '/src/assets/images/workshop_practice_experience_1795208194355.jpg';

export function OutcomesAndFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [imgError, setImgError] = useState(false);

  const logisticsFields = [
    { icon: Calendar, label: 'Fechas confirmadas', value: WORKSHOP_LOGISTICS.fecha },
    { icon: Clock, label: 'Horario', value: WORKSHOP_LOGISTICS.horario },
    { icon: Compass, label: 'Modalidad', value: WORKSHOP_LOGISTICS.modalidad },
    { icon: Users, label: 'Cupos limitados', value: WORKSHOP_LOGISTICS.cupos },
  ];

  return (
    <>
      {/* 6. EXPERIENCIA DEL WORKSHOP */}
      <section
        id="experiencia"
        className="mx-auto max-w-6xl border-t border-white/10 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#131526]/85 p-6 sm:p-8 lg:col-span-7"
          >
            <div>
              <p className="text-sm font-semibold text-[#12D6EB]">
                Experiencia del workshop · Aprender haciendo
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#F4F6FB] text-balance">
                No es una charla teórica: vienes a crear, grabar y editar en la práctica
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#B8C0D9]">
                El objetivo de Crea, Edita y Conecta es ofrecer una experiencia de aprendizaje
                cercana donde cada participante pone en práctica lo aprendido desde el primer
                momento. Trabajas tus ideas, pruebas encuadres con tu celular y editas paso a paso
                para perderle el miedo a publicar.
              </p>
            </div>

            {/* Logistics Container with Confirmed Dates & Time */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs font-semibold text-[#9BA4C2]">
                Agenda e información de la edición
              </p>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                {logisticsFields.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: idx * 0.06 }}
                      whileHover={{ y: -2 }}
                      className="rounded-xl border border-white/10 bg-[#0B0C18]/75 p-4 transition-colors hover:border-[#12D6EB]/35"
                    >
                      <dt className="flex items-center gap-2 text-xs font-medium text-[#9BA4C2]">
                        <IconComponent className="h-3.5 w-3.5 text-[#FF5D8F]" />
                        {item.label}
                      </dt>
                      <dd className="mt-1 font-display text-sm font-bold text-[#F4F6FB]">
                        {item.value}
                      </dd>
                    </motion.div>
                  );
                })}
              </dl>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 18 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-[300px] overflow-hidden rounded-2xl border border-white/10 bg-[#131526] lg:col-span-5"
          >
            {!imgError ? (
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                src={PRACTICE_IMAGE}
                alt="Participantes practicando grabación con celular y edición de video en un workshop"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover brightness-90 contrast-105"
              />
            ) : (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center bg-[#131526] p-6 text-center text-white">
                <Video className="h-10 w-10 text-[#12D6EB]" />
                <p className="mt-3 font-display text-sm font-semibold">
                  Experiencia práctica guiada
                </p>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0C18] via-[#0B0C18]/45 to-[#5B45A8]/15" />
            <div className="absolute right-6 bottom-6 left-6 text-white">
              <p className="text-xs font-semibold text-[#FF5D8F]">
                3, 4 y 5 de diciembre · 6:00 p. m.
              </p>
              <p className="mt-1 font-display text-base font-bold leading-snug">
                Transforma una idea en un video con intención, desde la planeación hasta el mensaje
                final.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. PREGUNTAS FRECUENTES */}
      <section
        id="preguntas"
        className="mx-auto max-w-4xl border-t border-white/10 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-left sm:text-center"
        >
          <p className="text-sm font-semibold text-[#12D6EB]">Preguntas frecuentes</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#F4F6FB]">
            Todo lo que necesitas saber antes de reservar
          </h2>
        </motion.div>

        <div className="mt-10 divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#131526]/85">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.02] focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#12D6EB]"
                >
                  <span className="font-display text-base font-bold text-[#F4F6FB]">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronDown
                      className={`h-5 w-5 ${isOpen ? 'text-[#12D6EB]' : 'text-[#8D96B5]'}`}
                    />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="px-6 pb-5 text-sm leading-relaxed text-[#B8C0D9]"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}
