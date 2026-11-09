import { CTA_LABEL } from '../../config/site';
import { useQuoteModal } from '../../context/QuoteModalContext';
import { cn } from '../../lib/cn';

export type CtaSize = 'compact' | 'md' | 'lg';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-amber font-bold text-navy shadow-sm ' +
  'whitespace-nowrap transition duration-150 hover:shadow-md hover:brightness-95 active:scale-[0.98] ' +
  'active:brightness-90 disabled:cursor-not-allowed disabled:opacity-80';

const SIZES: Record<CtaSize, string> = {
  compact: 'min-h-12 px-3 text-[13px] sm:px-5 sm:text-base',
  md: 'min-h-12 px-6 text-base',
  lg: 'min-h-14 px-8 text-lg',
};

/** Shared class names so the submit button in the form looks identical to every other CTA. */
export function ctaClasses(size: CtaSize = 'md', block = false, extra?: string): string {
  return cn(BASE, SIZES[size], block && 'w-full', extra);
}

interface CtaButtonProps {
  size?: CtaSize;
  block?: boolean;
  className?: string;
}

/**
 * The one conversion button. Label comes from CTA_LABEL. Clicking it opens the quote form
 * in a pop-up on top of the page (see QuoteModal), so nobody has to wait for a scroll.
 */
export function CtaButton({ size = 'md', block = false, className }: CtaButtonProps) {
  const { openQuote } = useQuoteModal();
  return (
    <button type="button" onClick={openQuote} aria-haspopup="dialog" className={ctaClasses(size, block, className)}>
      {CTA_LABEL}
    </button>
  );
}
