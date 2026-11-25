import { useEffect, useState } from 'react';
import { ArrowRight, Camera, Film, Play } from 'lucide-react';
import { MotionConfig, motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { BlackFridayHeroBanner } from './components/BlackFridayHeroBanner';
import { InteractiveTimeline } from './components/InteractiveTimeline';
import { CurriculumSection } from './components/CurriculumSection';
import { InstructorsSection } from './components/InstructorsSection';
import { OutcomesAndFaq } from './components/OutcomesAndFaq';
import { RegistrationSection } from './components/RegistrationSection';
import { PaymentPreviewModal, type RegistrationData } from './components/PaymentPreviewModal';
import { PROBLEM_POINTS, WORKSHOP_LOGISTICS } from './data/workshop';
import { loadStoredRegistration, saveStoredRegistration } from './utils/registration';

const HERO_STUDIO_IMAGE = '/src/assets/images/workshop_editing_desk_1795207150826.jpg';

export default function App() {
  const [activeRegistration, setActiveRegistration] = useState<RegistrationData | null>(null);
  const [modalRegistration, setModalRegistration] = useState<RegistrationData | null>(null);
  const [heroImgError, setHeroImgError] = useState(false);

  useEffect(() => {
    const stored = loadStoredRegistration();
    if (stored) {
      setActiveRegistration(stored);
    }
  }, []);

  function handleRegistered(record: RegistrationData) {
    setActiveRegistration(record);
    saveStoredRegistration(record);
  }

  function handlePaymentConfirmed(updated: RegistrationData) {
    setActiveRegistration(updated);
    setModalRegistration(updated);
    saveStoredRegistration(updated);
  }

  function handleResetRegistration() {
    setActiveRegistration(null);
    saveStoredRegistration(null);
  }

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28, restDelta: 0.001 });

  return (
    <MotionConfig reducedMotion="user">
      <div className="studio-ambient-bg min-h-screen text-[#F4F6FB]">
        {/* Top timeline-inspired scroll progress indicator */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX }}
          className="fixed top-0 right-0 left-0 z-50 h-[2.5px] origin-left bg-gradient-to-r from-[#7C6BF5] via-[#12D6EB] to-[#FF5D8F]"
        />
        <Navbar />

        <main>
          {/* BANNER PRINCIPAL BLACK FRIDAY */}
          <BlackFridayHeroBanner />

          {/* 1. HERO DEL WORKSHOP */}
          <section
            id="workshop-hero"
            className="mx-auto max-w-6xl px-4 pt-14 pb-16 sm:px-6 sm:pt-20 sm:pb-24 lg:px-8"
          >
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <p className="text-sm font-semibold text-[#FF5D8F]">
                  Workshop práctico · Creación de contenido y edición de video
                </p>

                <h1 className="mt-3 font-display text-[clamp(2.5rem,5vw,4.15rem)] font-extrabold leading-[1.05] tracking-tight text-[#F4F6FB] text-balance">
                  CREA, <span className="text-[#12D6EB]">EDITA Y CONECTA</span>
                </h1>

                <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#E3E8F6] sm:text-xl">
                  Aprende a crear contenido, grabar con intención y editar videos que conecten.
                </p>

                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#B8C0D9]">
                  Una experiencia práctica para emprendedores, creadores y marcas personales que
                  quieren transformar sus ideas en videos con ritmo, claridad y propósito usando su
                  celular.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <motion.a
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    href="#inversion"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#12D6EB] px-6 py-3.5 text-xs font-bold tracking-wide text-[#07101C] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#3CE1F2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12D6EB]"
                  >
                    QUIERO PARTICIPAR
                    <ArrowRight className="h-4 w-4" />
                  </motion.a>

                  <a
                    href="#modulos"
                    className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3.5 text-xs font-bold tracking-wide text-[#F4F6FB] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-white/30 hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12D6EB]"
                  >
                    VER CONTENIDO
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-xs font-medium text-[#B8C0D9]">
                  <span className="text-[#12D6EB]">3, 4 y 5 de diciembre · 6:00 p. m.</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#FF5D8F]">Cupos limitados: solo 30</span>
                  <span aria-hidden="true">·</span>
                  <span>Black Friday: $100.000 COP</span>
                  <span aria-hidden="true">·</span>
                  <span>Regular: $180.000 COP</span>
                </div>
              </motion.div>

              {/* Hero Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative lg:col-span-6"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/15 bg-[#131526]">
                  {!heroImgError ? (
                    <motion.img
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      src={HERO_STUDIO_IMAGE}
                      alt="Estudio oscuro con iluminación violeta y cian, cámara y monitor mostrando una línea de tiempo de edición"
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImgError(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-[#131526] p-8 text-center text-white">
                      <Camera className="h-12 w-12 text-[#12D6EB]" />
                      <p className="mt-3 font-display text-lg font-bold">
                        Crea, graba con tu celular y edita con intención
                      </p>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0C18]/90 via-[#0B0C18]/20 to-transparent" />

                  <div className="absolute right-5 bottom-5 left-5 flex items-center justify-between gap-4 text-white">
                    <div className="flex items-center gap-3">
                      <motion.span
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF5D8F] text-[#080912]"
                      >
                        <Play className="ml-0.5 h-4 w-4 fill-current" />
                      </motion.span>
                      <div>
                        <p className="font-display text-sm font-bold text-[#F4F6FB]">
                          De la idea al video final
                        </p>
                        <p className="text-xs text-[#D6DCF0]">
                          3, 4 y 5 de diciembre · 6:00 p. m.
                        </p>
                      </div>
                    </div>
                    <Film className="hidden h-5 w-5 text-[#12D6EB] sm:block" />
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* 2. EL PROBLEMA */}
          <section
            id="problema"
            className="border-t border-white/10 bg-[#080912]/70 py-16 sm:py-24"
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl"
              >
                <p className="text-sm font-semibold text-[#FF5D8F]">El problema</p>
                <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#F4F6FB] text-balance sm:text-4xl">
                  ¿Te pasa esto cada vez que intentas crear videos para tus redes?
                </h2>
              </motion.div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {PROBLEM_POINTS.map((item, idx) => (
                  <motion.article
                    key={item.number}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.4,
                      delay: idx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border border-white/10 bg-[#131526]/90 p-6 transition-colors hover:border-[#FF5D8F]/40"
                  >
                    <p className="font-mono text-xs font-semibold text-[#12D6EB]">
                      {item.number}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-bold leading-snug text-[#F4F6FB]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#B8C0D9]">{item.detail}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          {/* 3. LA SOLUCIÓN + PROPUESTA DE VALOR + TIMELINE ANIMADO */}
          <section
            id="solucion"
            className="mx-auto max-w-6xl border-t border-white/10 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-8 lg:grid-cols-12 lg:items-end"
            >
              <div className="lg:col-span-7">
                <p className="text-sm font-semibold text-[#12D6EB]">La solución</p>
                <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#F4F6FB] text-balance sm:text-4xl">
                  No se trata solamente de aprender a editar videos. Se trata de aprender a{' '}
                  <span className="text-[#12D6EB]">comunicar tus ideas</span> a través del
                  contenido.
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-base leading-relaxed text-[#B8C0D9]">
                  Crea, Edita y Conecta es una experiencia práctica donde aprendes a transformar una
                  idea en un video con intención: desde la planificación y grabación con celular
                  hasta la edición y comunicación clara del mensaje.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10"
            >
              <InteractiveTimeline />
            </motion.div>
          </section>

          {/* 4. LO QUE APRENDERÁS (3 MÓDULOS) & 5. ¿PARA QUIÉN ES? */}
          <CurriculumSection />

          {/* QUIÉNES DAN LA CLASE (SECCIÓN POR PROFESOR) */}
          <InstructorsSection />

          {/* 6. EXPERIENCIA DEL WORKSHOP & 8. PREGUNTAS FRECUENTES */}
          <OutcomesAndFaq />

          {/* 7. INVERSIÓN E INSCRIPCIONES */}
          <RegistrationSection
            onRegistered={handleRegistered}
            onOpenPaymentModal={(record) => setModalRegistration(record)}
            activeRegistration={activeRegistration}
            onResetRegistration={handleResetRegistration}
          />

          {/* 9. LLAMADO FINAL */}
          <section className="border-t border-white/10 bg-[#080912]/80 py-16 sm:py-24">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
            >
              <p className="text-sm font-semibold text-[#FF5D8F]">
                Cupos limitados · Solo 30 participantes
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight text-[#F4F6FB] text-balance sm:text-5xl">
                Tu próxima gran idea merece convertirse en contenido. Es momento de{' '}
                <span className="text-[#12D6EB]">crear, editar y conectar</span>.
              </h2>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  href="#inversion"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#12D6EB] px-7 py-4 text-xs font-bold tracking-wide text-[#07101C] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#3CE1F2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  RESERVAR MI CUPO
                  <ArrowRight className="h-4 w-4" />
                </motion.a>
              </div>
            </motion.div>
          </section>
        </main>

        {/* Quiet Footer */}
        <footer className="border-t border-white/10 bg-[#080912]">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <div>
              <p className="font-display text-sm font-extrabold text-[#F4F6FB]">
                CREA, EDITA Y CONECTA
              </p>
              <p className="mt-1 text-xs text-[#8D96B5]">
                Workshop práctico de creación de contenido y edición de video
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#A5AEC9]">
              <a href="#problema" className="hover:text-[#F4F6FB]">
                El problema
              </a>
              <a href="#modulos" className="hover:text-[#F4F6FB]">
                Módulos
              </a>
              <a href="#experiencia" className="hover:text-[#F4F6FB]">
                Experiencia
              </a>
              <a href="#inversion" className="hover:text-[#F4F6FB]">
                Inversión
              </a>
              <a
                href={`https://wa.me/${WORKSHOP_LOGISTICS.organizerWhatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#12D6EB] hover:underline"
              >
                WhatsApp: 318 871 5994
              </a>
            </div>
          </div>
        </footer>

        <PaymentPreviewModal
          registration={modalRegistration}
          onClose={() => setModalRegistration(null)}
          onPaymentConfirmed={handlePaymentConfirmed}
        />
      </div>
    </MotionConfig>
  );
}
