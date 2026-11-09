import { useId, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import type { ImageAsset } from '../../data/images';
import { clamp } from '../../lib/cn';
import { Img } from '../ui/Img';
import { ChevronsLeftRight } from '../ui/icons';

interface BeforeAfterSliderProps {
  before: ImageAsset;
  after: ImageAsset;
  /** Accessible name for the slider, e.g. "Before and after comparison: ...". */
  label: string;
}

const KEY_STEP = 5;
const KEY_STEP_LARGE = 15;

/**
 * Drag-slider image comparison. Works with mouse, touch and keyboard:
 * Left/Right (or Down/Up) move 5%, PageUp/PageDown move 15%, Home/End jump to either edge.
 * The "before" image is revealed on the left of the divider, the "after" image on the right.
 */
export function BeforeAfterSlider({ before, after, label }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const hintId = useId();

  const moveTo = (clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100, 0, 100));
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) moveTo(event.clientX);
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let next: number | null = null;
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        next = position - KEY_STEP;
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        next = position + KEY_STEP;
        break;
      case 'PageDown':
        next = position - KEY_STEP_LARGE;
        break;
      case 'PageUp':
        next = position + KEY_STEP_LARGE;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = 100;
        break;
      default:
        return;
    }
    event.preventDefault();
    setPosition(clamp(next, 0, 100));
  };

  const rounded = Math.round(position);

  return (
    <div
      ref={frameRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      style={{ aspectRatio: `${after.width} / ${after.height}`, touchAction: 'pan-y' }}
      className="relative w-full cursor-ew-resize select-none overflow-hidden rounded-xl bg-offwhite"
    >
      {/* After image sits underneath and fills the frame. */}
      <Img image={after} sizes="(min-width: 1024px) 360px, (min-width: 768px) 33vw, 100vw" className="absolute inset-0" />

      {/* Before image sits on top, clipped to the left of the divider. */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Img image={before} sizes="(min-width: 1024px) 360px, (min-width: 768px) 33vw, 100vw" className="absolute inset-0" />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-md bg-navy px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-md bg-white px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-navy">
        After
      </span>

      {/* Divider line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(20,40,63,0.35)]"
        style={{ left: `${position}%` }}
      />

      {/* The slider itself: a 48px focusable handle. */}
      <div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={rounded}
        aria-valuetext={`${rounded}% of the before image showing`}
        aria-describedby={hintId}
        onKeyDown={onKeyDown}
        style={{ left: `${position}%` }}
        className="absolute top-1/2 z-10 inline-flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-navy bg-white text-navy shadow-lg"
      >
        <ChevronsLeftRight className="size-6" aria-hidden="true" />
      </div>
      <span id={hintId} className="sr-only">
        Use the left and right arrow keys to compare before and after.
      </span>
    </div>
  );
}
