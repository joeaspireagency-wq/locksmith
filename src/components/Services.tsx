import { servicesSection, services } from '../data/placeholderContent';
import { Section, SectionCtaRow, SectionHeading } from './ui/Layout';
import { CtaButton } from './ui/CtaButton';
import { Reveal } from './ui/Reveal';
import { BadgeCheck, Check, ICONS } from './ui/icons';
import { Pricing } from './Pricing';

/**
 * Services grid (3x2 on desktop, 2 columns on tablet, 1 on phones) followed by the
 * "What you'll pay" pricing block, then one CTA.
 */
export function Services() {
  return (
    <Section id="services" labelledBy="services-heading" tone="white">
      <SectionHeading
        id="services-heading"
        tone="white"
        title={servicesSection.heading}
        intro={servicesSection.intro}
      />

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {services.map((service, index) => {
          const Icon = ICONS[service.icon];
          return (
            <li key={service.id} className="flex">
              <Reveal delay={(index % 3) * 80} className="flex w-full">
                <article className="group flex w-full flex-col overflow-hidden rounded-xl border border-slate/25 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
                  {/* Navy header band: icon on the left, "from" price in a white pill on the right. */}
                  <div className="relative flex items-center justify-between gap-4 overflow-hidden bg-navy px-5 py-4">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      viewBox="0 0 200 200"
                      className="pointer-events-none absolute -right-8 -top-12 size-44 text-white opacity-[0.07]"
                    >
                      <g fill="none" stroke="currentColor" strokeWidth="5">
                        <circle cx="100" cy="100" r="30" />
                        <circle cx="100" cy="100" r="55" />
                        <circle cx="100" cy="100" r="80" />
                      </g>
                    </svg>
                    <span className="relative inline-flex size-12 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/20">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <p className="relative rounded-lg bg-white px-3 py-1.5 text-right leading-none shadow-sm">
                      <span className="block text-xs font-semibold text-slate">from</span>
                      <span className="mt-0.5 block text-2xl font-extrabold text-navy">£{service.fromPrice}</span>
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-balance text-xl font-bold leading-snug text-navy">{service.name}</h3>
                    <p className="mt-2 text-base text-slate">{service.description}</p>
                    <ul className="mt-4 space-y-2.5 border-t border-slate/20 pt-4">
                      {service.included.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-base text-navy">
                          <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                            <Check className="size-3" strokeWidth={3.5} aria-hidden="true" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>

      <p className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-xl border border-navy/15 bg-navy/[0.06] px-4 py-3.5 text-left text-base font-medium text-navy md:items-center md:justify-center md:text-center">
        <BadgeCheck className="mt-0.5 size-5 shrink-0 md:mt-0" aria-hidden="true" />
        <span>{servicesSection.everyJobIncludes}</span>
      </p>

      <Pricing />

      <SectionCtaRow>
        <CtaButton size="lg" />
      </SectionCtaRow>
    </Section>
  );
}
