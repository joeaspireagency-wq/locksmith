import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Counts from 0 up to `target` once `active` is true.
 * Under prefers-reduced-motion it returns the final value immediately.
 */
export function useCountUp(target: number, active: boolean, durationMs = 1400): number {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (reduced || !active) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, reduced, durationMs]);

  return reduced ? target : value;
}
