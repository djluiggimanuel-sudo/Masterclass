import { useState } from 'react';
import { Award, Check, Clapperboard, Sparkles, User } from 'lucide-react';
import { motion } from 'motion/react';
import { INSTRUCTORS } from '../data/workshop';

export function InstructorsSection() {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <section
      id="profesores"
      aria-label="Quiénes dictan la clase"
      className="mx-auto max-w-6xl border-t border-white/10 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl"
      >
        <p className="text-sm font-semibold text-[#12D6EB]">Quiénes dan la clase</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#F4F6FB] text-balance sm:text-4xl">
          Aprende de la mano de quienes producen todos los días
        </h2>
      </motion.div>

      <div className="mt-10 space-y-10">
        {INSTRUCTORS.map((instructor) => {
          const imgError = Boolean(failedImages[instructor.id]);

          return (
            <motion.article
              key={instructor.id}
              id={instructor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-white/10 bg-[#131526]/90 p-6 sm:p-8 lg:p-10"
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
                {/* Left Column: Portrait + Quick Studio Specs */}
                <div className="lg:col-span-5">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/15 bg-[#0B0C18]">
                    {!imgError ? (
                      <motion.img
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        src={instructor.photoUrl}
                        alt={instructor.photoAlt}
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [instructor.id]: true }))
                        }
                        className="h-full w-full object-cover object-top"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-[#B8C0D9]">
                        <User className="h-12 w-12 text-[#12D6EB]" />
                        <p className="mt-3 font-display text-lg font-bold text-[#F4F6FB]">
                          {instructor.name}
                        </p>
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0C18]/90 via-transparent to-transparent" />
                    <div className="absolute right-5 bottom-5 left-5">
                      <p className="font-mono text-[11px] font-semibold tracking-wider text-[#12D6EB] uppercase">
                        {instructor.orderLabel}
                      </p>
                      <p className="mt-0.5 font-display text-xl font-extrabold text-[#F4F6FB]">
                        {instructor.name}
                      </p>
                    </div>
                  </div>

                  <dl className="mt-4 space-y-3 rounded-xl border border-white/10 bg-[#0B0C18]/75 p-4 text-xs">
                    <div className="flex items-start gap-2.5">
                      <Award className="mt-0.5 h-4 w-4 shrink-0 text-[#FF5D8F]" />
                      <div>
                        <dt className="font-semibold text-[#9BA4C2]">Trayectoria</dt>
                        <dd className="mt-0.5 font-medium text-[#F4F6FB]">
                          {instructor.experienceSummary}
                        </dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 border-t border-white/10 pt-3">
                      <Clapperboard className="mt-0.5 h-4 w-4 shrink-0 text-[#12D6EB]" />
                      <div>
                        <dt className="font-semibold text-[#9BA4C2]">Enfoque principal</dt>
                        <dd className="mt-0.5 font-medium text-[#F4F6FB]">
                          {instructor.focusSummary}
                        </dd>
                      </div>
                    </div>
                  </dl>
                </div>

                {/* Right Column: Role, Bio, Objective & Specializations */}
                <div className="lg:col-span-7">
                  <p className="text-base font-bold text-[#FF5D8F] sm:text-lg">
                    {instructor.roles}
                  </p>

                  <div className="mt-4 space-y-3.5 text-sm leading-relaxed text-[#C8D0E6] sm:text-[15px]">
                    {instructor.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Objetivo profesional */}
                  <div className="mt-6 rounded-xl border border-[#12D6EB]/25 bg-[#0B0C18]/75 p-5">
                    <p className="flex items-center gap-2 font-display text-xs font-bold tracking-wider text-[#12D6EB] uppercase">
                      <Sparkles className="h-3.5 w-3.5" />
                      Objetivo profesional
                    </p>
                    <p className="mt-2 text-sm leading-relaxed font-medium text-[#F4F6FB]">
                      {instructor.objective}
                    </p>
                  </div>

                  {/* Áreas de especialización */}
                  <div className="mt-7 border-t border-white/10 pt-6">
                    <h4 className="font-display text-base font-bold text-[#F4F6FB]">
                      Áreas de especialización
                    </h4>
                    <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                      {instructor.specializations.map((area) => (
                        <li
                          key={area}
                          className="flex items-start gap-2.5 text-sm text-[#C8D0E6]"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#12D6EB]" />
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
