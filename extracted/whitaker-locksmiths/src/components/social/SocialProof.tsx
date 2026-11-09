import { beforeAfter, socialProof, stories } from '../../data/placeholderContent';
import { getImage } from '../../data/images';
import { Section, SectionCtaRow, SectionHeading } from '../ui/Layout';
import { CtaButton } from '../ui/CtaButton';
import { Reveal } from '../ui/Reveal';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { ResultsBar } from './ResultsBar';
import { ReviewSlider } from './ReviewSlider';
import { StoryCard } from './StoryCard';

function SubHeading({ children }: { children: string }) {
  return <h3 className="mb-6 text-2xl font-extrabold tracking-tight text-navy md:text-3xl">{children}</h3>;
}

/**
 * Social proof: results bar, before/after slider, transformation stories and a one-at-a-time review slider.
 * All figures and quotes are demo content from src/data/placeholderContent.ts.
 */
export function SocialProof() {
  return (
    <Section id="reviews" labelledBy="proof-heading" tone="white">
      <SectionHeading id="proof-heading" tone="white" title={socialProof.heading} compact />

      <ResultsBar />

      <div className="mt-14">
        <SubHeading>{socialProof.beforeAfterHeading}</SubHeading>
        <ul className={beforeAfter.length > 1 ? 'grid gap-6 md:grid-cols-3' : 'mx-auto max-w-2xl'}>
          {beforeAfter.map((item, index) => (
            <li key={item.id} className="flex">
              <Reveal delay={index * 90} className="flex w-full">
                <figure className="w-full">
                  <BeforeAfterSlider before={getImage(item.before)} after={getImage(item.after)} label={item.ariaLabel} />
                  <figcaption className="mt-4">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-offwhite px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-slate">
                      Job type
                      <span aria-hidden="true">&middot;</span>
                      <span className="text-navy">{item.jobType}</span>
                    </span>
                    <p className="mt-2 text-base text-navy">{item.caption}</p>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <SubHeading>{socialProof.storiesHeading}</SubHeading>
        <ul className="grid gap-3 md:grid-cols-3 md:gap-4">
          {stories.map((story, index) => (
            <li key={story.id} className="flex">
              <Reveal delay={index * 90} className="flex w-full">
                <StoryCard story={story} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-14">
        <SubHeading>{socialProof.reviewsHeading}</SubHeading>
        <Reveal>
          <ReviewSlider />
        </Reveal>
      </div>

      <SectionCtaRow>
        <CtaButton size="lg" />
      </SectionCtaRow>
    </Section>
  );
}
