/**
 * Image registry. Every image on the site is looked up by id from here, so real
 * project photos can be swapped in by editing one entry: change `src` (and the
 * width, height and alt text to match), and optionally add `srcSet` and `sizes`.
 *
 * The owner portrait (danny-portrait.jpg) is a real photo supplied for this prototype.
 * The before/after files below are illustrated placeholders stored in /public/images,
 * not photographs. To use stock or real photos, drop them into /public/images (or
 * use full URLs) and update the entries. Set `focalPoint` (x, y as percentages) so
 * the crop keeps the important part of the picture in view.
 */

export type ImageId =
  | 'danny-portrait'
  | 'breakin-before'
  | 'breakin-after';

export interface ImageAsset {
  id: ImageId;
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Percentages (0-100) from the top-left of the image. */
  focalPoint: { x: number; y: number };
  srcSet?: string;
  sizes?: string;
}

export const IMAGES: Record<ImageId, ImageAsset> = {
  'danny-portrait': {
    id: 'danny-portrait',
    src: '/images/danny-portrait.jpg',
    alt: 'Danny Whitaker, owner of Whitaker Locksmiths, standing with his arms folded beside his work van',
    width: 819,
    height: 981,
    focalPoint: { x: 50, y: 25 },
  },
  'breakin-before': {
    id: 'breakin-before',
    src: '/images/breakin-before.svg',
    alt: 'Illustration of a timber door frame splintered after a break-in',
    width: 800,
    height: 600,
    focalPoint: { x: 55, y: 55 },
  },
  'breakin-after': {
    id: 'breakin-after',
    src: '/images/breakin-after.svg',
    alt: 'Illustration of the same door with the frame repaired and a new lock fitted',
    width: 800,
    height: 600,
    focalPoint: { x: 55, y: 55 },
  },
};

export function getImage(id: ImageId): ImageAsset {
  return IMAGES[id];
}
