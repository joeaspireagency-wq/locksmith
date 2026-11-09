import { trustItems } from '../data/placeholderContent';
import { Container } from './ui/Layout';
import { Reveal } from './ui/Reveal';
import { ICONS } from './ui/icons';

/** Four reassurance points directly under the hero. 2x2 on phones, one row from tablet up. */
export function TrustStrip() {
  return (
    <section aria-label="Why customers trust us" className="bg-offwhite py-10 md:py-12">
      <Container>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-8">
          {trustItems.map((item, index) => {
            const Icon = ICONS[item.icon];
            return (
              <li key={item.id}>
                <Reveal delay={index * 70} className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:gap-4 sm:text-left">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-slate/30 bg-white text-slate">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="mt-3 block sm:mt-0">
                    <span className="block text-base font-bold text-navy">{item.label}</span>
                    <span className="mt-0.5 block text-base text-slate">{item.line}</span>
                  </span>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
