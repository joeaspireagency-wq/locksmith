import { guarantee } from '../data/placeholderContent';
import { SectionHeading, Container } from './ui/Layout';
import { CtaButton } from './ui/CtaButton';
import { Reveal } from './ui/Reveal';
import { ICONS } from './ui/icons';

/**
 * Guarantee (navy). Four promises in a compact 2x2 grid (1 column on phones), small print, one CTA.
 *
 * Client must confirm each promise before launch.
 */
export function Guarantee() {
  return (
    <section id="guarantee" aria-labelledby="guarantee-heading" className="bg-navy py-9 text-white md:py-12">
      <Container>
        <SectionHeading id="guarantee-heading" tone="navy" title={guarantee.heading} compact />

        <ul className="mt-5 grid gap-3 md:mt-7 md:grid-cols-2 md:gap-4">
          {guarantee.cards.map((card, index) => {
            const Icon = ICONS[card.icon];
            return (
              <li key={card.id} className="flex">
                <Reveal delay={(index % 2) * 90} className="flex w-full">
                  <article className="flex w-full gap-4 rounded-xl border border-white/20 bg-white/[0.06] p-4 md:p-5">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white md:size-11">
                      <Icon className="size-5 md:size-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold leading-snug text-white md:text-xl">{card.title}</h3>
                      <p className="mt-1 text-[0.95rem] leading-snug text-white/85 md:text-base">{card.body}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <p className="mx-auto mt-5 max-w-3xl text-center text-sm text-white/70">{guarantee.smallPrint}</p>

        <div className="mt-6 flex justify-center md:mt-7">
          <CtaButton size="lg" />
        </div>
      </Container>
    </section>
  );
}
