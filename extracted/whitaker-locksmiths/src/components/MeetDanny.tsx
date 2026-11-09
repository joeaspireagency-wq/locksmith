import { getImage } from '../data/images';
import { meetDanny } from '../data/placeholderContent';
import { Section } from './ui/Layout';
import { Img } from './ui/Img';
import { Reveal } from './ui/Reveal';
import { Check } from './ui/icons';

/** Founder profile: portrait on one side, first-person blurb on the other. No CTA here by design. */
export function MeetDanny() {
  const portrait = getImage(meetDanny.portrait);

  return (
    <Section id="meet-danny" labelledBy="danny-heading" tone="offwhite">
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <Reveal>
          <figure className="mx-auto w-full max-w-sm">
            <div
              className="overflow-hidden rounded-xl bg-navy shadow-lg ring-1 ring-navy/10"
              style={{ aspectRatio: `${portrait.width} / ${portrait.height}` }}
            >
              <Img image={portrait} sizes="(min-width: 768px) 384px, 90vw" />
            </div>
            <figcaption className="mt-3 text-center text-base font-semibold text-slate">{meetDanny.caption}</figcaption>
          </figure>
        </Reveal>

        <Reveal delay={100}>
          <h2
            id="danny-heading"
            className="text-3xl font-extrabold leading-tight tracking-tight text-navy md:text-4xl lg:text-[2.75rem]"
          >
            {meetDanny.heading}
          </h2>
          <blockquote className="mt-5 text-lg leading-relaxed text-navy md:text-xl">
            <p>{meetDanny.blurb}</p>
          </blockquote>
          <p className="mt-6 border-l-4 border-navy pl-4 text-lg font-bold text-navy">{meetDanny.tagline}</p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {meetDanny.facts.map((fact) => (
              <li
                key={fact}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate/30 bg-white px-3.5 text-sm font-semibold text-navy"
              >
                <Check className="size-4 text-slate" strokeWidth={3} aria-hidden="true" />
                {fact}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
