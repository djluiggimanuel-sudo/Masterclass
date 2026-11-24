import { ArrowRight, Camera, Film, Play, Scissors, Smartphone, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { WORKSHOP_LOGISTICS } from '../data/workshop';

export function BlackFridayHeroBanner() {
  const totalSeats = Math.max(1, WORKSHOP_LOGISTICS.cuposTotales);
  const occupiedSeats = Math.min(totalSeats, Math.max(0, WORKSHOP_LOGISTICS.cuposOcupados));
  const availableSeats = Math.max(0, totalSeats - occupiedSeats);
  const availableRatio = availableSeats / totalSeats;
  const isSoldOut = availableSeats === 0;
  return (
    <section
      aria-label="Banner principal promoción Black Friday"
      className="relative overflow-hidden border-b border-white/10"
    >
      {/* Animated atmospheric radial glow */}
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.07, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(124,107,245,0.26)_0%,rgba(94,34,72,0.20)_38%,transparent_72%)]"
      />

      {/* Geometric studio particles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.span
          animate={{ y: [0, -10, 0], rotate: [45, 90, 45], opacity: [0.45, 0.9, 0.45] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-14 left-[18%] h-2 w-2 bg-[#12D6EB]"
        />
        <motion.span
          animate={{ y: [0, 12, 0], rotate: [12, -18, 12], opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-24 right-[20%] h-2.5 w-2.5 bg-[#FF5D8F]"
        />
        <motion.span
          animate={{ y: [0, -8, 0], x: [0, 5, 0], opacity: [0.35, 0.8, 0.35] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 left-[26%] h-1.5 w-5 -rotate-12 bg-[#7C6BF5]"
        />
        <motion.span
          animate={{ y: [0, 9, 0], x: [0, -5, 0], opacity: [0.35, 0.8, 0.35] }}
          transition={{ duration: 4.9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[26%] bottom-16 h-1.5 w-5 rotate-12 bg-[#2DD48F]"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Left Floating Studio Element: Angled 9:16 Vertical Reel Frame */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, x: -36, rotate: -12 }}
          animate={{ opacity: 1, x: 0, rotate: -8 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          className="pointer-events-none absolute top-14 -left-10 hidden w-48 rounded-2xl border border-white/15 bg-[#131526]/95 p-3 shadow-2xl lg:block xl:left-4"
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px] font-mono text-[#A5AEC9]">
              <span className="flex items-center gap-1 text-[#12D6EB]">
                <Smartphone className="h-3 w-3" />
                REEL 9:16
              </span>
              <span>REC</span>
            </div>
            <div className="mt-2.5 flex aspect-[9/11] flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[#231D47] via-[#131526] to-[#0D2C3A] p-3 text-center">
              <motion.span
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF5D8F] text-[#080912]"
              >
                <Play className="ml-0.5 h-4 w-4 fill-current" />
              </motion.span>
              <p className="mt-2.5 font-display text-xs font-bold text-white">CREA Y GRABA</p>
              <p className="mt-0.5 text-[10px] text-[#B8C0D9]">Con intención</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Left-Bottom Floating Clip Accent */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, y: 24, rotate: 6 }}
          animate={{ opacity: 1, y: 0, rotate: 5 }}
          transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute bottom-10 left-8 hidden items-center gap-2.5 rounded-xl border border-[#12D6EB]/30 bg-[#0B0C18]/90 px-3.5 py-2.5 shadow-xl lg:flex xl:left-20"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center gap-2.5"
          >
            <Camera className="h-4 w-4 text-[#12D6EB]" />
            <span className="font-mono text-xs font-semibold text-[#F4F6FB]">
              3, 4 Y 5 DE DIC · 6:00 PM
            </span>
          </motion.div>
        </motion.div>

        {/* Right Floating Studio Element: Angled Multi-Track Timeline with sweeping playhead */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, x: 36, rotate: 12 }}
          animate={{ opacity: 1, x: 0, rotate: 8 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          className="pointer-events-none absolute top-14 -right-10 hidden w-56 rounded-2xl border border-white/15 bg-[#131526]/95 p-3.5 shadow-2xl lg:block xl:right-4"
        >
          <motion.div
            animate={{ y: [0, 10, 0], rotate: [0, -1.5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px] font-mono text-[#A5AEC9]">
              <span className="flex items-center gap-1 text-[#FF5D8F]">
                <Scissors className="h-3 w-3" />
                TIMELINE
              </span>
              <span className="tabular-nums">00:16:04</span>
            </div>
            <div className="relative mt-3 space-y-2">
              <div className="flex gap-1.5">
                <div className="h-4 w-16 rounded bg-[#7C6BF5]" />
                <div className="h-4 w-10 rounded bg-[#FF5D8F]" />
                <div className="h-4 flex-1 rounded bg-[#12D6EB]" />
              </div>
              <div className="flex gap-1.5">
                <div className="h-4 w-24 rounded bg-[#2DD48F]" />
                <div className="h-4 w-14 rounded bg-[#FFB03A]" />
              </div>
              <div className="flex gap-1.5">
                <div className="h-4 w-28 rounded bg-[#538BF7]" />
                <div className="h-4 flex-1 rounded bg-[#538BF7]" />
              </div>
              {/* Animated Coral Playhead */}
              <motion.div
                animate={{ x: [0, 82, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-1 bottom-0 left-[22%] w-0.5 bg-[#FF5D8F]"
              />
            </div>
            <p className="mt-3 text-[11px] font-semibold text-[#E3E8F6]">
              Edición dinámica paso a paso
            </p>
          </motion.div>
        </motion.div>

        {/* Right-Bottom Floating Clip Accent */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, y: 24, rotate: -6 }}
          animate={{ opacity: 1, y: 0, rotate: -5 }}
          transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute right-8 bottom-10 hidden items-center gap-2.5 rounded-xl border border-[#FF5D8F]/30 bg-[#0B0C18]/90 px-3.5 py-2.5 shadow-xl lg:flex xl:right-20"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center gap-2.5"
          >
            <Film className="h-4 w-4 text-[#FF5D8F]" />
            <span className="font-mono text-xs font-semibold text-[#F4F6FB]">
              CREA · EDITA · CONECTA
            </span>
          </motion.div>
        </motion.div>

        {/* Monumental Centered Black Friday Lockup */}
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-xs font-bold tracking-[0.15em] text-[#12D6EB] uppercase"
          >
            Workshop 3, 4 y 5 de diciembre · 6:00 p. m. · Cupos limitados (solo 30) · Promo 21 al 28 nov
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 140, damping: 18, delay: 0.05 }}
            className="relative mt-4 select-none"
          >
            <motion.div
              initial={{ x: -16, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(3.25rem,9vw,6.2rem)] font-extrabold leading-[0.86] tracking-tight text-transparent"
              style={{ WebkitTextStroke: '1.75px rgba(244, 246, 251, 0.72)' }}
            >
              BLACK
            </motion.div>

            <motion.div
              initial={{ scale: 0.85, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: -3 }}
              transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.16 }}
              className="relative z-10 -my-3 sm:-my-5"
            >
              <span className="inline-block font-display text-2xl font-extrabold italic tracking-wide text-[#FF5D8F] drop-shadow-[0_6px_20px_rgba(255,93,143,0.45)] sm:text-4xl">
                Preventa
              </span>
            </motion.div>

            <motion.div
              initial={{ x: 16, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(3.25rem,9vw,6.2rem)] font-extrabold leading-[0.88] tracking-tight text-[#F4F6FB]"
            >
              FRIDAY
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1"
          >
            <span className="font-display text-xl font-bold tracking-wide text-[#F4F6FB] sm:text-2xl">
              SOLO{' '}
              <span className="text-3xl font-extrabold text-[#12D6EB] tabular-nums sm:text-4xl">
                $100.000 COP
              </span>
            </span>
            <span className="font-mono text-sm text-[#9BA4C2] line-through tabular-nums sm:text-base">
              Regular $180.000 COP
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#C8D0E6] sm:text-base"
          >
            <strong className="font-semibold text-[#F4F6FB]">CREA, EDITA Y CONECTA:</strong>{' '}
            aprende a crear contenido, grabar con intención y editar videos que conecten con tu
            audiencia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.a
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              href="#inversion"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF5D8F] px-7 py-4 text-xs font-extrabold tracking-wide text-[#080912] whitespace-nowrap shrink-0 shadow-[0_10px_30px_rgba(255,93,143,0.3)] transition-colors duration-150 hover:bg-[#FF7BA4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              APROVECHAR PRECIO DE PREVENTA
              <ArrowRight className="h-4 w-4" />
            </motion.a>

            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              href="#workshop-hero"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-6 py-4 text-xs font-bold tracking-wide text-[#F4F6FB] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#12D6EB] hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12D6EB]"
            >
              CONOCER EL WORKSHOP
            </motion.a>
          </motion.div>
          {/* Barra animada de cupos disponibles integrada en el banner principal */}
          <motion.div
            id="cupos"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-7 max-w-lg rounded-2xl border border-white/15 bg-[#131526]/85 px-5 py-4 text-left shadow-xl backdrop-blur-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-[#F4F6FB]">
                <Users className="h-3.5 w-3.5 text-[#12D6EB]" />
                {isSoldOut
                  ? 'Todos los cupos están reservados'
                  : `Quedan ${availableSeats} de ${totalSeats} cupos disponibles`}
              </span>
              <span className="font-mono text-[11px] font-semibold text-[#12D6EB] tabular-nums">
                {availableSeats} disponibles · {occupiedSeats} reservados
              </span>
            </div>

            <div
              role="progressbar"
              aria-label="Cupos disponibles en el workshop"
              aria-valuenow={availableSeats}
              aria-valuemin={0}
              aria-valuemax={totalSeats}
              className="relative mt-2.5 h-3.5 w-full overflow-hidden rounded-full border border-white/10 bg-[#0B0C18]"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: availableRatio }}
                transition={{ duration: 0.9, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'left center' }}
                className="relative h-full w-full overflow-hidden rounded-full bg-gradient-to-r from-[#7C6BF5] via-[#12D6EB] to-[#FF5D8F]"
              >
                <motion.div
                  aria-hidden="true"
                  animate={{ x: ['-100%', '220%'] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.4 }}
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                />
              </motion.div>
            </div>

            <div className="mt-1.5 flex justify-between font-mono text-[10px] text-[#8D96B5] tabular-nums">
              <span>0</span>
              <span>10</span>
              <span>20</span>
              <span>{totalSeats} cupos máximo</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom signature 3-track mini timeline motif with subtle stagger */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-xl space-y-1.5 sm:mt-10"
        >
          <div className="flex gap-1.5">
            <div className="h-2 w-[28%] rounded-full bg-[#7C6BF5]" />
            <div className="h-2 w-[16%] rounded-full bg-[#FF5D8F]" />
            <div className="h-2 w-[34%] rounded-full bg-[#7C6BF5]" />
            <div className="h-2 flex-1 rounded-full bg-[#12D6EB]" />
          </div>
          <div className="flex gap-1.5">
            <div className="h-2 w-[15%] rounded-full bg-[#12D6EB]" />
            <div className="h-2 w-[36%] rounded-full bg-[#2DD48F]" />
            <div className="h-2 w-[20%] rounded-full bg-[#FFB03A]" />
            <div className="h-2 flex-1 rounded-full bg-[#12D6EB]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
