import { howItWorks } from '../data/placeholderContent';
import { Container, SectionHeading } from './ui/Layout';
import { Reveal } from './ui/Reveal';
import { Clock, ICONS } from './ui/icons';

/**
 * Three steps on a connected timeline. Phones: a compact vertical timeline with
 * the icon on the left. From 768px: three columns joined by a dashed line, icons on top.
 * No card boxes, so the section stays short.
 */
export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="bg-offwhite py-10 text-navy md:py-12">
      <Container>
        <SectionHeading id="how-heading" tone="offwhite" title={howItWorks.heading} compact />

        <div className="relative mx-auto mt-5 max-w-4xl md:mt-6">
          {/* Desktop connector: runs through the middle of the three icon circles. */}
          <div
            aria-hidden="true"
            className="absolute left-[16.66%] right-[16.66%] top-7 hidden border-t-2 border-dashed border-slate/40 md:block"
          />

          <ol className="relative grid gap-0 md:grid-cols-3 md:gap-8">
            {howItWorks.steps.map((step, index) => {
              const Icon = ICONS[step.icon];
              return (
                <li key={step.id} className="relative pb-7 last:pb-0 md:pb-0">
                  {/* Phone connector: from this circle down to the next one. */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-6 top-12 -translate-x-1/2 border-l-2 border-dashed border-slate/40 last:hidden md:hidden"
                  />
                  <Reveal delay={index * 100} className="flex gap-4 md:block md:text-center">
                    <span className="relative z-10 block shrink-0 md:mx-auto md:w-fit">
                      <span
                        aria-hidden="true"
                        className="flex size-12 items-center justify-center rounded-full bg-navy text-white shadow-md ring-4 ring-offwhite md:size-14"
                      >
                        <Icon className="size-6 md:size-7" />
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-white text-xs font-extrabold text-navy ring-2 ring-navy"
                      >
                        {index + 1}
                      </span>
                    </span>

                    <div className="min-w-0 md:mt-4">
                      <h3 className="text-lg font-bold leading-snug text-navy md:text-xl">
                        <span className="sr-only">Step {index + 1}: </span>
                        {step.title}
                      </h3>
                      <p className="mt-1 text-base text-slate">{step.body}</p>
                      <p className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm font-semibold text-navy ring-1 ring-slate/25">
                        <Clock className="size-4 text-slate" aria-hidden="true" />
                        {step.badge}
                      </p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
