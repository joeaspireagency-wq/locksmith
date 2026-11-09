import { useState } from 'react';
import { faq } from '../data/placeholderContent';
import { cn } from '../lib/cn';
import { Section, SectionHeading } from './ui/Layout';
import { ChevronDown } from './ui/icons';

/**
 * FAQ accordion: one flat list of the seven questions that matter most. The first item is
 * open by default and only one item is open at a time. Each question is a real <button>
 * (Enter and Space toggle it) with aria-expanded and aria-controls, and closed answers are
 * removed from the accessibility tree with the `hidden` attribute.
 */
export function Faq() {
  const [openId, setOpenId] = useState<string | null>(faq.items[0]?.id ?? null);

  return (
    <Section id="faq" labelledBy="faq-heading" tone="offwhite">
      <SectionHeading id="faq-heading" tone="offwhite" title={faq.heading} />

      <div className="mx-auto max-w-3xl divide-y divide-slate/20 overflow-hidden rounded-xl border border-slate/25 bg-white">
        {faq.items.map((item) => {
          const open = openId === item.id;
          const buttonId = `faq-q-${item.id}`;
          const panelId = `faq-a-${item.id}`;
          return (
            <div key={item.id}>
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenId(open ? null : item.id)}
                  className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-3.5 text-left text-base font-bold text-navy md:text-lg"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className={cn('size-5 shrink-0 text-slate transition-transform duration-200', open && 'rotate-180')}
                  />
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open} className="px-5 pb-5">
                <p className="text-base text-slate md:text-lg">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
