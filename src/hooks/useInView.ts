import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Becomes true (and stays true) once the element scrolls into view.
 * With reduced motion, or without IntersectionObserver, it is true straight away
 * so content is never left hidden.
 */
export function useInView<T extends Element>(ref: RefObject<T | null>, threshold = 0.2): boolean {
  const reduced = useReducedMotion();
  const supportsObserver = typeof IntersectionObserver !== 'undefined';
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (reduced || !supportsObserver) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, reduced, supportsObserver, threshold]);

  return reduced || !supportsObserver || seen;
}
