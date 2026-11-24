import { useState } from 'react';
import { Check, Film, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';
import { MODULES, TARGET_PROFILES } from '../data/workshop';

const MOBILE_REELS_IMAGE = '/src/assets/images/creator_filming_setup_1795207151597.jpg';

export function CurriculumSection() {
  const [activeModule, setActiveModule] = useState<'crea' | 'edita' | 'conecta'>('crea');
  const [imgError, setImgError] = useState(false);

  return (
    <>
      {/* 4. LO QUE APRENDERÁS: 3 Modules */}
      <section
        id="modulos"
        className="mx-auto max-w-6xl border-t border-white/10 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold text-[#FF5D8F]">
            Lo que aprenderás · Estructura en 3 módulos
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#F4F6FB] text-balance sm:text-4xl">
            Un recorrido práctico desde la idea hasta el video publicado
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#B8C0D9]">
            Tres sesiones consecutivas los días 3, 4 y 5 de diciembre a las 6:00 p. m., combinando
            criterio creativo y práctica real.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {MODULES.map((mod, idx) => {
            const isHighlighted = activeModule === mod.id;
            return (
              <motion.article
                key={mod.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setActiveModule(mod.id)}
                className={`relative flex cursor-pointer flex-col justify-between rounded-2xl border p-6 transition-colors duration-150 sm:p-7 ${
                  isHighlighted
                    ? 'border-[#12D6EB] bg-[#181B33] text-[#F4F6FB]'
                    : 'border-white/10 bg-[#131526]/85 text-[#F4F6FB] hover:border-white/25'
                }`}
              >
                {isHighlighted && (
                  <motion.div
                    layoutId="active-module-highlight"
                    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                    className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[#12D6EB]/60"
                  />
                )}

                <div className="relative z-10">
                  <div className="flex items-baseline justify-between gap-2 border-b border-white/10 pb-4">
                    <span
                      className={`font-mono text-xs font-semibold ${
                        isHighlighted ? 'text-[#12D6EB]' : 'text-[#FF5D8F]'
                      }`}
                    >
                      {mod.number}
                    </span>
                    <span className="font-display text-xl font-extrabold tracking-tight text-white">
                      {mod.label}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold leading-snug text-[#F4F6FB]">
                    {mod.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-[#9BA4C2]">{mod.subtitle}</p>

                  <ul className="mt-5 space-y-2.5">
                    {mod.topics.map((topic, topicIdx) => (
                      <motion.li
                        key={topic}
                        initial={{ opacity: 0, x: -6 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: idx * 0.08 + topicIdx * 0.04,
                        }}
                        className="flex items-start gap-2.5 text-sm"
                      >
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            isHighlighted ? 'text-[#12D6EB]' : 'text-[#2DD48F]'
                          }`}
                        />
                        <span className="text-[#E3E8F6]">{topic}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10 mt-6 border-t border-white/10 pt-4">
                  <p className="text-xs leading-relaxed text-[#B8C0D9]">{mod.outcome}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* 5. ¿PARA QUIÉN ES? */}
      <section
        id="para-quien"
        className="mx-auto max-w-6xl border-t border-white/10 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
          {/* Left: Dark Studio Setup Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 18 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-[340px] overflow-hidden rounded-2xl border border-white/10 bg-[#131526] lg:col-span-5"
          >
            {!imgError ? (
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                src={MOBILE_REELS_IMAGE}
                alt="Estudio con cámara, iluminación suave y ambiente violeta y cian para grabación de contenido"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full min-h-[340px] flex-col items-center justify-center bg-[#131526] p-6 text-center text-white">
                <Smartphone className="h-10 w-10 text-[#12D6EB]" />
                <p className="mt-3 font-display text-sm font-semibold">
                  Creación móvil y contenido digital
                </p>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0C18] via-[#0B0C18]/35 to-transparent" />
            <div className="absolute right-6 bottom-6 left-6 text-white">
              <p className="flex items-center gap-2 text-xs font-semibold text-[#12D6EB]">
                <Film className="h-4 w-4" />
                Sin experiencia previa requerida
              </p>
              <p className="mt-1.5 font-display text-lg font-bold leading-snug">
                Cualquier persona puede desarrollar habilidades digitales con práctica y orientación.
              </p>
            </div>
          </motion.div>

          {/* Right: 6 Target Profiles */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-sm font-semibold text-[#12D6EB]">¿Para quién es?</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#F4F6FB] text-balance">
                Diseñado para quienes quieren comunicar sus ideas en video
              </h2>
            </motion.div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {TARGET_PROFILES.map((profile, idx) => (
                <motion.div
                  key={profile.number}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -3 }}
                  className="rounded-xl border border-white/10 bg-[#131526]/85 p-5 transition-colors hover:border-[#12D6EB]/45"
                >
                  <p className="font-mono text-xs font-semibold text-[#FF5D8F]">
                    {profile.number}
                  </p>
                  <h3 className="mt-1.5 font-display text-base font-bold leading-snug text-[#F4F6FB]">
                    {profile.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#B8C0D9]">
                    {profile.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
