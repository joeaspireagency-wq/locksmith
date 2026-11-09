import { PHONE_HREF, SITE } from '../config/site';
import { CtaButton } from './ui/CtaButton';
import { Phone } from './ui/icons';

/**
 * Sticky bottom bar (z-40), phones only (below 768px). Two equal buttons: the CTA and "Call Now".
 * App.tsx adds matching bottom padding so the bar never covers content or the footer.
 */
export function StickyBar() {
  return (
    <div
      role="region"
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate/25 bg-white shadow-[0_-4px_16px_rgba(20,40,63,0.12)] md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto flex max-w-xl items-center gap-2.5 px-3 py-2.5">
        <div className="flex-1">
          <CtaButton size="compact" block />
        </div>
        <a
          href={PHONE_HREF}
          aria-label={`Call now on ${SITE.phone}`}
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-lg border-2 border-navy bg-white text-navy transition active:scale-[0.98]"
        >
          <Phone className="size-5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
