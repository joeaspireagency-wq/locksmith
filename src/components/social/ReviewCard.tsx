import type { Review } from '../../data/placeholderContent';
import { BadgeCheck, Star } from '../ui/icons';

/**
 * One review. Stars are navy (never amber, which is reserved for the CTA).
 * Driven entirely by the Review type, so real reviews can replace the data
 * in placeholderContent.ts without any change here.
 */
export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full w-full flex-col rounded-xl border border-slate/25 bg-white p-6 shadow-sm md:p-8">
      <div className="flex items-center justify-between gap-3">
        <div role="img" aria-label={`${review.rating} out of 5 stars`} className="flex gap-0.5">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              aria-hidden="true"
              className={index < review.rating ? 'size-5 fill-navy text-navy' : 'size-5 text-slate/40'}
            />
          ))}
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-offwhite px-2.5 py-1 text-xs font-bold text-slate">
          <BadgeCheck className="size-3.5" aria-hidden="true" />
          Verified job
        </span>
      </div>

      <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-navy md:text-xl">
        <p>&ldquo;{review.quote}&rdquo;</p>
      </blockquote>

      <figcaption className="mt-5 border-t border-slate/20 pt-4">
        <p className="text-base font-bold text-navy">
          {review.name}, <span className="font-semibold text-slate">{review.area}</span>
        </p>
        <p className="text-sm text-slate">{review.service}</p>
      </figcaption>
    </figure>
  );
}
