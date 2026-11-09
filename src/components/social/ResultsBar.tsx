import { useRef } from 'react';
import { stats } from '../../data/placeholderContent';
import type { Stat } from '../../data/placeholderContent';
import { useCountUp } from '../../hooks/useCountUp';
import { useInView } from '../../hooks/useInView';

function formatStat(stat: Stat, value: number): string {
  const formatted = value.toLocaleString('en-GB', {
    minimumFractionDigits: stat.decimals,
    maximumFractionDigits: stat.decimals,
  });
  return `${stat.prefix}${formatted}${stat.suffix}`;
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const value = useCountUp(stat.value, active);

  return (
    <div className="text-center">
      <p className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
        {/* Screen readers get the final figure at once; sighted visitors see the count-up. */}
        <span className="sr-only">{formatStat(stat, stat.value)}</span>
        <span aria-hidden="true">{formatStat(stat, value)}</span>
      </p>
      <p className="mt-2 text-base text-slate">{stat.label}</p>
    </div>
  );
}

/** Four headline numbers. They count up on scroll, except under prefers-reduced-motion. */
export function ResultsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.3);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-x-4 gap-y-8 rounded-xl border border-slate/20 bg-offwhite px-4 py-8 lg:grid-cols-4 lg:px-8 lg:py-10"
    >
      {stats.map((stat) => (
        <StatItem key={stat.id} stat={stat} active={inView} />
      ))}
    </div>
  );
}
