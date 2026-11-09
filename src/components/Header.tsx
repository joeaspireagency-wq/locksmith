import { useEffect, useRef, useState } from 'react';
import { NAV_LINKS, PHONE_HREF, SITE } from '../config/site';
import { useScrolled } from '../hooks/useScrolled';
import { cn } from '../lib/cn';
import { Logo } from './Logo';
import { Menu, PhoneCall, X } from './ui/icons';

/**
 * Sticky header (z-30): logo, phone and a menu button. The menu is a dropdown listing every
 * section of the page (full width on phones, a card under the button from 768px). It closes on
 * Escape, on choosing a section, or on a click outside. The header shrinks slightly and gains a
 * shadow once the page has been scrolled.
 */
export function Header() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        // z-30 normally; z-50 while the menu is open so its dimmed backdrop also covers the phone bottom bar (z-40).
        'sticky top-0 bg-white transition-shadow duration-200',
        menuOpen ? 'z-50' : 'z-30',
        scrolled || menuOpen ? 'shadow-md' : 'border-b border-slate/15',
      )}
    >
      <div
        className={cn(
          'mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-3 transition-[height] duration-200 sm:gap-4 sm:px-6 lg:px-8',
          scrolled ? 'h-16 md:h-[4.25rem]' : 'h-16 md:h-20',
        )}
      >
        <a
          href="#top"
          aria-label={`${SITE.businessName}, back to top`}
          onClick={() => setMenuOpen(false)}
          className="inline-flex min-h-12 items-center rounded-lg"
        >
          <Logo />
        </a>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Desktop: number as text. */}
          <a
            href={PHONE_HREF}
            className="hidden min-h-12 items-center gap-2 rounded-lg px-2 text-lg font-bold text-navy md:inline-flex"
          >
            <PhoneCall className="size-5 text-slate" aria-hidden="true" />
            <span>{SITE.phone}</span>
          </a>

          {/* Mobile: phone icon button. */}
          <a
            href={PHONE_HREF}
            aria-label={`Call ${SITE.businessName} on ${SITE.phone}`}
            className="inline-flex size-12 shrink-0 items-center justify-center rounded-lg border border-slate/40 text-navy md:hidden"
          >
            <PhoneCall className="size-5" aria-hidden="true" />
          </a>

          <button
            ref={buttonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
            className={cn(
              'inline-flex size-12 shrink-0 items-center justify-center rounded-lg border text-navy transition',
              menuOpen ? 'border-navy bg-navy text-white' : 'border-slate/40 hover:bg-offwhite',
            )}
          >
            {menuOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        // Dims the page and catches outside clicks. aria-hidden: Escape and the button are the accessible ways out.
        <div aria-hidden="true" onClick={() => setMenuOpen(false)} className="absolute inset-x-0 top-full h-dvh bg-navy/50" />
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 top-full" hidden={!menuOpen}>
        <div className="mx-auto flex max-w-6xl justify-end md:px-6 lg:px-8">
          <nav
            id="site-menu"
            aria-label="Sections"
            className="site-menu pointer-events-auto max-h-[calc(100dvh-4rem)] w-full overflow-y-auto bg-navy text-white shadow-2xl md:mt-2 md:w-80 md:rounded-xl"
          >
            <ul className="px-4 md:px-2 md:py-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="border-b border-white/15 last:border-b-0 md:border-b-0">
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-14 items-center rounded-lg text-lg font-semibold md:px-3 md:text-base md:hover:bg-white/10"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/15 px-4 pb-5 pt-4 md:px-5">
              <a
                href={PHONE_HREF}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-lg text-xl font-bold underline underline-offset-4"
              >
                <PhoneCall className="size-5" aria-hidden="true" />
                {SITE.phone}
              </a>
              <p className="mt-1 text-sm text-white/80">{SITE.hours.emergency}</p>
              <p className="text-sm text-white/80">{SITE.hours.bookings}</p>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
