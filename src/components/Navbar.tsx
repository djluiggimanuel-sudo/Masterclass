import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '#problema', label: 'El problema' },
    { href: '#modulos', label: 'Módulos' },
    { href: '#inversion', label: 'Inversión' },
    { href: '#preguntas', label: 'Preguntas' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B0C18]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="font-display text-sm font-extrabold tracking-tight text-[#F4F6FB] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#12D6EB] sm:text-base"
        >
          CREA, EDITA Y CONECTA
        </a>

        {/* Zone 2: 4 single-line navigation links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#B8C0D9]"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#F4F6FB] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#12D6EB]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <motion.a
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            href="#inversion"
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#12D6EB] px-4 py-2 text-xs font-bold tracking-wide text-[#07101C] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#3CE1F2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12D6EB]"
          >
            QUIERO MI CUPO
          </motion.a>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-[#F4F6FB] transition-colors hover:bg-white/5 md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12D6EB]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-white/10 bg-[#0B0C18] px-4 py-4 md:hidden"
          >
            <nav aria-label="Menú móvil" className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 text-sm font-medium text-[#D6DCF0] hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#inversion"
                onClick={() => setMobileOpen(false)}
                className="mt-1 inline-flex items-center justify-center rounded-lg bg-[#12D6EB] px-4 py-2.5 text-xs font-bold tracking-wide text-[#07101C]"
              >
                QUIERO MI CUPO
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
