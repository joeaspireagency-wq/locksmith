import { useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { reviews } from '../../data/placeholderContent';
import { cn } from '../../lib/cn';
import { ArrowLeft, ArrowRight } from '../ui/icons';
import { ReviewCard } from './ReviewCard';

const SWIPE_DISTANCE_PX = 50;

/**
 * One review at a time, with previous / next buttons, a position counter and swipe on touch
 * screens. It loops, so there is no dead end. No auto-play: nothing moves unless the visitor
 * moves it. Off-screen slides are hidden from assistive tech, and a polite live region
 * announces "Review 2 of 6" on change. Left / Right arrow keys work while focus is inside.
 */
export function ReviewSlider() {
  const count = reviews.length;
  const [index, setIndex] = useState(0);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  const go = (target: number) => setIndex(((target % count) + count) % count);
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      next();
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) >= SWIPE_DISTANCE_PX && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
    }
  };

  const buttonClass =
    'inline-flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-navy bg-white text-navy shadow-sm transition hover:bg-navy hover:text-white active:scale-95';

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Customer reviews"
      onKeyDown={onKeyDown}
      className="mx-auto max-w-2xl"
    >
      <div
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          pointerStart.current = null;
        }}
        className="select-none overflow-hidden rounded-xl"
        style={{ touchAction: 'pan-y' }}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {reviews.map((review, position) => (
            <div
              key={review.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${position + 1} of ${count}`}
              aria-hidden={position !== index}
              className="w-full shrink-0 p-1"
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-5">
        <button type="button" onClick={prev} aria-label="Previous review" className={buttonClass}>
          <ArrowLeft className="size-5" aria-hidden="true" />
        </button>

        <div className="flex min-w-24 items-center justify-center" aria-hidden="true">
          <span className="flex gap-1.5">
            {reviews.map((review, position) => (
              <span
                key={review.id}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  position === index ? 'w-6 bg-navy' : 'w-1.5 bg-slate/35',
                )}
              />
            ))}
          </span>
        </div>

        <button type="button" onClick={next} aria-label="Next review" className={buttonClass}>
          <ArrowRight className="size-5" aria-hidden="true" />
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        Review {index + 1} of {count}
      </p>
    </div>
  );
}
