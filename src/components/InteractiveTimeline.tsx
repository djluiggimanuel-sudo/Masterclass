import { useEffect, useState } from 'react';
import { Camera, Film, Pause, Play, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TIMELINE_PREVIEW_CLIPS, type TimelineInteractiveClip } from '../data/workshop';

const CLIP_COLORS: Record<string, string> = {
  'tl-idea': '#7C6BF5',
  'tl-rec': '#FF5D8F',
  'tl-cut': '#7C6BF5',
  'tl-text': '#2DD48F',
  'tl-sfx': '#FFB03A',
  'tl-story': '#538BF7',
};

export function InteractiveTimeline() {
  const [selectedId, setSelectedId] = useState<string>('tl-cut');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const selectedClip: TimelineInteractiveClip =
    TIMELINE_PREVIEW_CLIPS.find((c) => c.id === selectedId) ?? TIMELINE_PREVIEW_CLIPS[0];

  const playheadPct = Math.min(96, Math.max(4, selectedClip.startPct + selectedClip.widthPct * 0.5));

  useEffect(() => {
    if (!isPlaying) return;
    const orderedIds = TIMELINE_PREVIEW_CLIPS.map((c) => c.id);
    const interval = window.setInterval(() => {
      setSelectedId((prev) => {
        const idx = orderedIds.indexOf(prev);
        return orderedIds[(idx + 1) % orderedIds.length];
      });
    }, 2800);
    return () => window.clearInterval(interval);
  }, [isPlaying]);

  const trackRows: Array<{ row: 1 | 2 | 3; name: string }> = [
    { row: 1, name: 'V1 · Cámara' },
    { row: 2, name: 'V2 · Capas' },
    { row: 3, name: 'A1 · Historia' },
  ];

  return (
    <div className="grid gap-6 rounded-2xl border border-white/10 bg-[#131526]/90 p-5 sm:p-7 lg:grid-cols-12 lg:items-center">
      {/* Left: Multi-Track NLE Timeline */}
      <div className="lg:col-span-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#A5AEC9]">
            <motion.span
              key={selectedClip.timecode}
              initial={{ opacity: 0.4, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="font-mono text-sm font-medium text-[#12D6EB] tabular-nums"
            >
              {selectedClip.timecode}
            </motion.span>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-[#F4F6FB]">{selectedClip.stage}</span>
            <span aria-hidden="true">·</span>
            <span>{selectedClip.label}</span>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsPlaying((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-[#F4F6FB] whitespace-nowrap shrink-0 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#12D6EB]"
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5 text-[#FF5D8F]" />
                Pausar línea de tiempo
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 text-[#12D6EB]" />
                Animar secuencia
              </>
            )}
          </motion.button>
        </div>

        {/* Tracks */}
        <div className="relative mt-5 select-none">
          <div className="mb-2 hidden justify-between pl-24 font-mono text-[11px] text-[#7C85A3] tabular-nums sm:flex">
            <span>00:00</span>
            <span>00:08</span>
            <span>00:16</span>
            <span>00:24</span>
            <span>00:30</span>
          </div>

          <div className="relative space-y-2.5">
            {trackRows.map(({ row, name }, rowIdx) => {
              const clips = TIMELINE_PREVIEW_CLIPS.filter((c) => c.track === row);
              return (
                <div key={row} className="flex items-center gap-3">
                  <span className="hidden w-20 shrink-0 font-mono text-[11px] text-[#8D96B5] sm:block">
                    {name}
                  </span>
                  <div className="relative h-10 flex-1 rounded-lg bg-[#0B0C18]/80">
                    {clips.map((clip, clipIdx) => {
                      const isSelected = clip.id === selectedClip.id;
                      const bgColor = CLIP_COLORS[clip.id] ?? '#12D6EB';
                      return (
                        <motion.button
                          key={clip.id}
                          type="button"
                          initial={{ opacity: 0, scale: 0.92 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.35,
                            delay: rowIdx * 0.08 + clipIdx * 0.05,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          animate={{ scale: isSelected ? 1.015 : 1 }}
                          onClick={() => {
                            setIsPlaying(false);
                            setSelectedId(clip.id);
                          }}
                          style={{
                            left: `${clip.startPct}%`,
                            width: `${clip.widthPct}%`,
                            backgroundColor: bgColor,
                          }}
                          className={`absolute top-1 bottom-1 flex items-center overflow-hidden rounded-md px-2.5 text-left text-[11px] font-bold text-[#080912] transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-white ${
                            isSelected
                              ? 'ring-2 ring-white brightness-110 z-10 opacity-100'
                              : 'opacity-85 hover:opacity-100'
                          }`}
                        >
                          <span className="truncate">{clip.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Spring-animated Coral-Pink Playhead */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 bottom-0 left-0 right-0 sm:left-[92px]"
            >
              <motion.div
                className="relative h-full"
                animate={{ x: `${playheadPct}%` }}
                transition={{ type: 'spring', stiffness: 160, damping: 22 }}
              >
                <div className="absolute -top-2 -left-1.5 h-3 w-3 rotate-45 bg-[#FF5D8F]" />
                <div className="h-full w-[2.5px] bg-[#FF5D8F]" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Selected Step Explanation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedClip.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 rounded-xl border border-white/10 bg-[#0B0C18]/75 p-4"
          >
            <p className="text-xs font-semibold text-[#12D6EB]">
              Etapa {selectedClip.stage} · {selectedClip.label}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-[#E3E8F6]">
              {selectedClip.lessonNote}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right: Vertical Reel 9:16 Live Preview Frame */}
      <div className="lg:col-span-4">
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="mx-auto max-w-[260px] rounded-2xl border border-white/15 bg-[#0B0C18] p-3 text-white"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px] text-[#A5AEC9]">
            <span className="flex items-center gap-1.5 font-mono">
              <Smartphone className="h-3.5 w-3.5 text-[#12D6EB]" />
              9:16 REEL
            </span>
            <span className="flex items-center gap-1 font-mono tabular-nums">
              <Camera className="h-3.5 w-3.5 text-[#A5AEC9]" />
              1080×1920
            </span>
          </div>

          <div className="relative mt-3 flex aspect-[9/12] flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br from-[#231D47] via-[#131526] to-[#0D2C3A] p-4">
            <div className="flex justify-between">
              <span className="h-3 w-3 border-t-2 border-l-2 border-[#12D6EB]/60" />
              <span className="h-3 w-3 border-t-2 border-r-2 border-[#12D6EB]/60" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedClip.id}
                initial={{ opacity: 0, scale: 0.94, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.03, y: -6 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="my-auto text-center"
              >
                <motion.div
                  animate={isPlaying ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#FF5D8F] text-[#080912]"
                >
                  <Play className="ml-0.5 h-5 w-5 fill-current" />
                </motion.div>
                <p className="mt-4 font-display text-sm font-bold text-white">
                  {selectedClip.reelTitle}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#D6DCF0]">
                  {selectedClip.reelCaption}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between border-t border-white/10 pt-2.5 text-[11px] text-[#A5AEC9]">
              <span className="flex items-center gap-1">
                <Film className="h-3.5 w-3.5 text-[#FF5D8F]" />
                Vista previa
              </span>
              <span className="font-mono tabular-nums">{selectedClip.timecode}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
