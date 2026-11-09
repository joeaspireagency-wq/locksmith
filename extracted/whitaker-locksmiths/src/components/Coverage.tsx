import { SITE } from '../config/site';
import { coverage } from '../data/placeholderContent';
import { Container } from './ui/Layout';
import { Reveal } from './ui/Reveal';
import { Clock, MapPin } from './ui/icons';

/**
 * Areas covered, from src/config/site.ts so it stays in step with the footer. One navy panel:
 * heading, typical arrival time and a short note on top, the areas as white pills underneath
 * (two per row, four per row from 1024px).
 */
export function Coverage() {
  return (
    <section id="coverage" aria-labelledby="coverage-heading" className="bg-white py-8 md:py-12">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-navy px-4 py-6 text-white sm:px-8 md:px-10 md:py-9">
            {/* Decorative coverage rings. Purely visual, hidden from assistive tech. */}
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 400 400"
              className="pointer-events-none absolute -right-28 -top-28 size-96 text-white opacity-[0.06]"
            >
              <g fill="none" stroke="currentColor" strokeWidth="6">
                <circle cx="200" cy="200" r="60" />
                <circle cx="200" cy="200" r="110" />
                <circle cx="200" cy="200" r="160" />
                <circle cx="200" cy="200" r="195" />
              </g>
            </svg>

            <div className="relative">
              <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
                <div>
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/80 sm:text-sm">
                    <Clock className="size-4 shrink-0" aria-hidden="true" />
                    Typical arrival: {SITE.typicalArrival}
                  </p>
                  <h2
                    id="coverage-heading"
                    className="mt-1.5 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl"
                  >
                    {coverage.heading}
                  </h2>
                </div>
                <p className="mt-2 text-[0.95rem] text-white/85 md:text-base lg:mt-0 lg:max-w-sm">{coverage.note}</p>
              </div>

              <ul className="mt-5 grid grid-cols-2 gap-2 md:mt-6 md:gap-3 lg:grid-cols-4">
                {SITE.areasCovered.map((area) => (
                  <li
                    key={area}
                    className="flex min-h-10 w-full items-center gap-1.5 rounded-full bg-white py-1.5 pl-3 pr-2.5 text-sm font-semibold text-navy shadow-sm sm:text-[0.95rem] md:min-h-11 md:gap-2 md:pl-4 md:text-base"
                  >
                    <MapPin className="hidden size-4 shrink-0 text-slate min-[400px]:block" aria-hidden="true" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
