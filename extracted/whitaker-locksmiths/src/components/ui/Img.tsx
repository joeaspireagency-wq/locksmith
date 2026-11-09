import type { ImageAsset } from '../../data/images';
import { cn } from '../../lib/cn';

interface ImgProps {
  image: ImageAsset;
  className?: string;
  sizes?: string;
  /**
   * Only for the single most important above-the-fold image (none on this page at
   * present: the hero is text and form). Loads eagerly with fetchpriority="high".
   */
  priority?: boolean;
}

/**
 * Renders an entry from src/data/images.ts with explicit width and height (no layout
 * shift), lazy loading below the fold, async decoding and the saved focal point.
 */
export function Img({ image, className, sizes, priority = false }: ImgProps) {
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes ?? image.sizes}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'auto' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      draggable={false}
      style={{ objectPosition: `${image.focalPoint.x}% ${image.focalPoint.y}%` }}
      className={cn('block h-full w-full object-cover', className)}
    />
  );
}
