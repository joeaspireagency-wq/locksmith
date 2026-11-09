import { SITE } from '../config/site';
import { cn } from '../lib/cn';
import { KeyRound } from './ui/icons';

/** Simple wordmark with a small key icon. Stacked on phones so the header stays on one line. */
export function Logo({ tone = 'light', className }: { tone?: 'light' | 'dark'; className?: string }) {
  const onDark = tone === 'dark';
  const [first, ...rest] = SITE.businessName.split(' ');
  const second = rest.join(' ');

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        aria-hidden="true"
        className={cn(
          'inline-flex size-8 shrink-0 items-center justify-center rounded-lg sm:size-10',
          onDark ? 'bg-white text-navy' : 'bg-navy text-white',
        )}
      >
        <KeyRound className="size-4 sm:size-5" strokeWidth={2.25} />
      </span>
      <span className={cn('flex flex-col leading-none sm:flex-row sm:items-baseline sm:gap-1.5', onDark ? 'text-white' : 'text-navy')}>
        <span className="text-[17px] font-extrabold tracking-tight sm:text-xl">{first}</span>
        <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] sm:mt-0 sm:text-xl sm:font-medium sm:normal-case sm:tracking-tight">
          {second}
        </span>
      </span>
      <span className="sr-only">{SITE.businessName}</span>
    </span>
  );
}
