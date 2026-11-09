import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type Tone = 'white' | 'offwhite' | 'navy';

const TONE_CLASSES: Record<Tone, string> = {
  white: 'bg-white text-navy',
  offwhite: 'bg-offwhite text-navy',
  navy: 'bg-navy text-white',
};

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}

interface SectionProps {
  /** Anchor id (also gets scroll-margin-top from index.css). */
  id?: string;
  /** id of the section's heading, for the landmark name. */
  labelledBy: string;
  tone: Tone;
  children: ReactNode;
  className?: string;
}

/** A full-width page section with the standard vertical rhythm (48px mobile, 80px desktop). */
export function Section({ id, labelledBy, tone, children, className }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('py-12 md:py-20', TONE_CLASSES[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}

interface SectionHeadingProps {
  id: string;
  title: string;
  intro?: string;
  tone: Tone;
  align?: 'left' | 'center';
  /** Less space underneath, for when a label or note follows straight after the heading. */
  compact?: boolean;
  className?: string;
}

export function SectionHeading({
  id,
  title,
  intro,
  tone,
  align = 'center',
  compact = false,
  className,
}: SectionHeadingProps) {
  const onNavy = tone === 'navy';
  return (
    <div
      className={cn(
        compact ? 'mb-5' : 'mb-10 md:mb-12',
        align === 'center' && 'mx-auto max-w-3xl text-center',
        className,
      )}
    >
      <h2
        id={id}
        className={cn(
          'text-balance text-3xl font-extrabold leading-tight tracking-tight md:text-4xl lg:text-[2.75rem]',
          onNavy ? 'text-white' : 'text-navy',
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p className={cn('mt-4 text-lg', onNavy ? 'text-white/80' : 'text-slate')}>{intro}</p>
      ) : null}
    </div>
  );
}

/** Centred CTA row used after the main content sections. */
export function SectionCtaRow({ children }: { children: ReactNode }) {
  return <div className="mt-10 flex justify-center md:mt-12">{children}</div>;
}
