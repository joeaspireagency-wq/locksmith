/**
 * Site configuration for Whitaker Locksmiths.
 *
 * This is the one file to edit when personalising the template for another
 * UK locksmith business. Every CTA button reads CTA_LABEL, and every contact
 * link is derived from SITE, so nothing needs changing in the components.
 *
 * Colour tokens: Tailwind v4 reads its theme from src/index.css (@theme).
 * COLOURS below mirrors those values for use in JS. Keep the two in sync.
 */

/** The one and only conversion label. Change it here and every CTA updates. */
export const CTA_LABEL = 'Get My Fixed Price';

export const COLOURS = {
  navy: '#14283F',
  white: '#FFFFFF',
  offwhite: '#F3F6F8',
  amber: '#F4B740',
  slate: '#526579',
} as const;

/** Turns a UK number such as "+44 7340 873560" or "07340 873560" into a tel: link ("tel:+447340873560"). */
export function toTelHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, '');
  return `tel:${digits.startsWith('+') ? digits : `+44${digits.replace(/^0/, '')}`}`;
}

/** Sections listed in the header menu, in page order. Each href must match a section id. */
export const NAV_LINKS = [
  { label: 'Services & pricing', href: '#services' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Our guarantee', href: '#guarantee' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Meet Danny', href: '#meet-danny' },
  { label: 'Areas we cover', href: '#coverage' },
  { label: 'FAQ', href: '#faq' },
] as const;

export const SITE = {
  businessName: 'Whitaker Locksmiths',
  ownerName: 'Daniel "Danny" Whitaker',
  ownerFirstName: 'Danny',
  phone: '+44 7340 873560',
  whatsapp: '+44 7340 873560',
  email: 'hello@whitakerlocksmiths.example',
  hours: {
    emergency: '24/7 emergency call-outs',
    bookings: 'Routine bookings Mon-Sat 8am-6pm',
  },
  region: 'Leeds and West Yorkshire',
  areasCovered: [
    'Leeds city centre',
    'Headingley',
    'Chapel Allerton',
    'Roundhay',
    'Horsforth',
    'Morley',
    'Pudsey',
    'Bradford',
  ],
  yearsOfExperience: 17,
  selfEmployedSince: 2015,
  typicalArrival: '30-45 minutes',
  outOfHoursSupplement: '£30',
  callbackWithinMinutes: 10,
  trustPoints: [
    'Fixed price confirmed before work starts',
    'Photo ID shown on arrival',
    'Enhanced DBS checked',
    '£2m public liability insurance',
    'Non-destructive entry first',
    '12-month workmanship guarantee',
  ],
  // Placeholder registration details for the footer. Replace before launch.
  companyNumber: 'Company no. 00000000 (placeholder)',
  icoNumber: 'ICO registration no. ZA000000 (placeholder)',
  copyrightYear: 2026,
  /**
   * When true, the quote form shows a small "demo" note so nobody thinks a real
   * enquiry is being sent. Set to false for a live site.
   */
  demoMode: true,
} as const;

export const PHONE_HREF = toTelHref(SITE.phone);
export const WHATSAPP_HREF = toTelHref(SITE.whatsapp);

export const SEO = {
  title: 'Whitaker Locksmiths | 24/7 Emergency Locksmith Leeds - Fixed Prices',
  description:
    'Locked out in Leeds? Get a fixed price before we set off. DBS-checked, insured, typically with you in 30-45 minutes, day or night.',
} as const;
