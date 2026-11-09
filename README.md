# Whitaker Locksmiths: website prototype

A frontend-only, conversion-focused website prototype for a fictional UK locksmith business. One goal, one primary CTA ("Get My Fixed Price"), one customer journey. Built as a reusable template that can be personalised for other UK locksmith businesses.

**Stack:** Vite, React, TypeScript, Tailwind CSS v4, lucide-react, react-hook-form, zod. No backend, no router, no external APIs.

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck (tsc --noEmit) then production build
npm run preview    # serve the production build
```

Dependency versions in `package.json` are caret ranges chosen without registry access. After installing, run `npm outdated` and bump anything that has a newer supported release.

## Personalising it for another business

| What | Where |
| --- | --- |
| Business name, phone, WhatsApp, email, hours, areas, trust points, CTA label, colour tokens | `src/config/site.ts` |
| All demo content: hero copy, services, prices, guarantees, stats, stories, reviews, FAQs, founder profile | `src/data/placeholderContent.ts` |
| Images (id, src, alt, width, height, focal point) | `src/data/images.ts` |
| Quote submission (schemas, types, mock transport) | `src/services/submitQuote.ts` |
| Theme tokens (Tailwind v4 reads these from CSS) | `src/index.css` under `@theme` |
| Page title and meta description | `SEO` in `src/config/site.ts` and `index.html` (keep in sync) |

Every CTA button reads `CTA_LABEL` from `site.ts`, so the label changes in one place. Colours are limited to five tokens (navy, white, offwhite, amber, slate). Amber is used only on the CTA button.

## Before this goes in front of a real customer

- **Replace demo content.** `placeholderContent.ts` starts with the comment `DEMO CONTENT ONLY - replace with real client data before launch`. All reviews, figures, stories and prices are fictional.
- **Confirm the guarantees.** The client must confirm each promise in `guarantee` before launch (there is a code comment in `Guarantee.tsx` and `placeholderContent.ts`).
- **Replace the dummy reviews** with real, verifiable ones.
- **Replace the images.** The owner portrait (`public/images/danny-portrait.jpg`) is the photo supplied for this prototype; swap it for the real client's. `public/images/breakin-*.svg` are illustrated placeholders, not photographs. See the notes at the top of `src/data/images.ts`. `scripts/generate-placeholder-images.py` regenerates them.
- **Connect the form.** `submitQuote.ts` uses a mock transport that waits about a second and returns a fake receipt. Nothing is sent or stored. The integration point is marked with a comment. To see the error state in the demo, add `?simulate=error` to the page URL.
- **Turn off demo mode.** Set `demoMode: false` in `site.ts` to remove the "nothing you enter is sent or stored" note from the form.
- **Placeholder legal details.** Company number, ICO number, Privacy Policy and Terms in the footer are plain-text placeholders and are not linked to pages.

## Notes

- Every CTA button opens the quote form in a pop-up (`QuoteModal`, built on the native `<dialog>` element), so nobody waits for a scroll. Esc, the close button or a click outside closes it, and focus returns to the button that opened it.
- The header has a menu button (no CTA): it opens a dropdown listing every section, from `NAV_LINKS` in `site.ts`. Add a section to the page and to that list together.
- Customer reviews show one at a time in `ReviewSlider` (arrows, swipe, Left/Right keys, loops, no auto-play). Reviews live in `reviews` in `placeholderContent.ts`.
- The hero's Google rating strip reads `googleReviews` in `placeholderContent.ts`. Its dashed "Example" tag is the only on-page sign that the figures are demo data: set `exampleLabel` to `''` once they are real.
- Motion is subtle (fade-in on scroll, count-up on the statistics) and is disabled under `prefers-reduced-motion`.
- All icons come through `src/components/ui/icons.ts`. If a future lucide-react release renames an icon, that is the only file to change.
- The quote form's step 1 uses a "Continue" button rather than auto-advancing, so keyboard users can arrow through the options without being moved on.
