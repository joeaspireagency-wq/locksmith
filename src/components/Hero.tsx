import { PHONE_HREF, SITE } from '../config/site';
import { googleReviews, hero } from '../data/placeholderContent';
import { cn } from '../lib/cn';
import { Container } from './ui/Layout';
import { CtaButton } from './ui/CtaButton';
import { PhoneCall, Star } from './ui/icons';

/** Overlapping initials, five stars and the rating line, as on a Google reviews badge. */
function GoogleRating() {
  const { rating, count, initials, exampleLabel } = googleReviews;
  return (
    <div
      role="img"
      aria-label={`Rated ${rating} out of 5 from ${count} Google reviews`}
      className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3"
    >
      <div className="flex" aria-hidden="true">
        {initials.map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className={cn(
              'flex size-11 items-center justify-center rounded-full border-2 border-navy text-base font-bold sm:size-12',
              index > 0 && '-ml-3',
              index % 2 === 0 ? 'bg-white text-navy' : 'bg-slate text-white',
            )}
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="text-left" aria-hidden="true">
        <div className="flex gap-1 text-white">
          {[0, 1, 2, 3, 4].map((n) => (
            <Star key={n} className="size-5" fill="currentColor" strokeWidth={1.5} />
          ))}
        </div>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-base text-white/85">
          <span>
            <strong className="font-bold text-white">{rating}/5</strong> from {count} Google reviews
          </span>
          {exampleLabel ? (
            <span className="rounded-full border border-dashed border-white/60 px-2.5 py-0.5 text-sm text-white/85">
              {exampleLabel}
            </span>
          ) : null}
        </p>
      </div>
    </div>
  );
}

/**
 * Hero (navy). One centred column: eyebrow, headline, the CTA (which opens the quote pop-up)
 * and the Google rating. There is no hero image, so the page loads fast.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-navy text-white">
      {/* z-10: decorative background shape. Purely visual, hidden from assistive tech. */}
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -right-24 -top-16 z-10 hidden size-[34rem] text-white opacity-[0.05] lg:block"
      >
        <g fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="140" cy="260" r="86" />
          <circle cx="140" cy="260" r="26" />
          <path d="M200 200 340 60M290 110l44 44M320 80l36 36" />
        </g>
      </svg>

      <Container className="relative z-20 py-10 md:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">{hero.eyebrow}</p>
            <h1
              id="hero-heading"
              className="mt-3 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]"
            >
              {hero.headline}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">{hero.subhead}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-5">
              <CtaButton size="lg" className="w-full sm:w-auto" />
              <a
                href={PHONE_HREF}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-2 text-lg font-semibold text-white"
              >
                <PhoneCall className="size-5 text-white/80" aria-hidden="true" />
                <span>
                  <span className="font-normal text-white/80">or call </span>
                  {SITE.phone}
                </span>
              </a>
            </div>

            <GoogleRating />
          </div>
        </div>
      </Container>
    </section>
  );
}
