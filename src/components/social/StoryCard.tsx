import type { Story } from '../../data/placeholderContent';
import { CircleCheck, ICONS } from '../ui/icons';

/**
 * One transformation story: the problem and what we did as short run-in lines, then the result
 * in a solid navy block at the foot of the card so the outcome is what the eye lands on.
 */
export function StoryCard({ story }: { story: Story }) {
  const Icon = ICONS[story.icon];

  return (
    <article className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-slate/25 bg-white shadow-sm">
      <div className="flex items-center gap-3 px-4 pt-4">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-navy text-white">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h4 className="text-lg font-bold leading-snug text-navy">{story.title}</h4>
      </div>

      <dl className="mt-3 flex flex-1 flex-col gap-2.5 px-4 pb-4 text-[0.95rem] leading-snug">
        <div>
          <dt className="inline font-bold text-slate">The problem: </dt>
          <dd className="inline text-navy">{story.problem}</dd>
        </div>
        <div>
          <dt className="inline font-bold text-slate">What we did: </dt>
          <dd className="inline text-navy">{story.action}</dd>
        </div>
        <div className="-mx-4 -mb-4 mt-auto bg-navy px-4 py-3 text-white">
          <dt className="inline font-bold text-white/70">
            <CircleCheck className="mr-1.5 inline size-5 align-text-bottom" aria-hidden="true" />
            The result:{' '}
          </dt>
          <dd className="inline font-semibold">{story.result}</dd>
        </div>
      </dl>
    </article>
  );
}
