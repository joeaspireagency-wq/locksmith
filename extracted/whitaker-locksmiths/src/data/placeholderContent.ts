// DEMO CONTENT ONLY - replace with real client data before launch
//
// Everything customer-facing that is not layout lives in this file: hero copy,
// services, prices, guarantees, statistics, stories, reviews, FAQs and so on.
// Components read from here, so content can be swapped without touching layout.
// Business details (phone, hours, areas) live in src/config/site.ts.

import type { ImageId } from './images';
import type { JobType, PreferredTime } from '../services/submitQuote';

/* -------------------------------------------------------------------------- */
/* Icon keys (mapped to lucide icons in src/components/ui/icons.ts)           */
/* -------------------------------------------------------------------------- */

export type IconKey =
  | 'door'
  | 'key'
  | 'shield'
  | 'wrench'
  | 'hammer'
  | 'building'
  | 'pound'
  | 'id'
  | 'badge'
  | 'handshake'
  | 'clipboard'
  | 'phone'
  | 'tools'
  | 'home'
  | 'lock';

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: '24/7 Leeds locksmith',
  headline: 'Locked out? Fixed price, at your door in 30 minutes.',
  subhead:
    "Tell us what's happened and get a fixed price in 60 seconds. DBS-checked, fully insured, and we confirm the price before we set off.",
};

/** Google rating strip in the hero. The same figures feed the results bar, so they always agree. */
export const googleReviews = {
  rating: 4.9,
  count: 310,
  /** Initials of the first four reviewers below. */
  initials: ['S', 'J', 'P', 'M'],
  /** Dashed tag shown while the figures are demo data. Set to '' to hide it. */
  exampleLabel: 'Example',
};

/* -------------------------------------------------------------------------- */
/* Quote form                                                                 */
/* -------------------------------------------------------------------------- */

export const quoteForm = {
  heading: 'Get your fixed price',
  step1Title: "What's happened?",
  step2Title: 'Where and who?',
  reassurance: 'Fixed price confirmed before we start. No hidden call-out charge.',
  success: "Request received. Danny's team will call you within 10 minutes with your fixed price.",
  jobOptions: [
    { value: 'locked-out', label: 'Locked out', icon: 'door' },
    { value: 'broken-lock', label: 'Broken or stuck lock', icon: 'wrench' },
    { value: 'change-locks', label: 'Change or upgrade locks', icon: 'key' },
    { value: 'break-in', label: 'Break-in repair', icon: 'hammer' },
    { value: 'landlord', label: 'Landlord or multiple properties', icon: 'building' },
  ] as ReadonlyArray<{ value: JobType; label: string; icon: IconKey }>,
  timeOptions: [
    { value: 'asap', label: 'As soon as possible' },
    { value: 'today', label: 'Today' },
    { value: 'tomorrow', label: 'Tomorrow' },
    { value: 'choose-date', label: 'Choose a date' },
  ] as ReadonlyArray<{ value: PreferredTime; label: string }>,
  demoNote: 'Demo form: nothing you enter is sent or stored.',
};

/* -------------------------------------------------------------------------- */
/* Trust strip                                                                */
/* -------------------------------------------------------------------------- */

export const trustItems: ReadonlyArray<{ id: string; icon: IconKey; label: string; line: string }> = [
  { id: 'fixed', icon: 'pound', label: 'Fixed price first', line: 'You agree the price before we start' },
  { id: 'id', icon: 'id', label: 'ID on arrival', line: 'Photo ID shown at the door' },
  { id: 'dbs', icon: 'shield', label: 'DBS checked', line: 'Enhanced DBS certificate' },
  { id: 'guarantee', icon: 'badge', label: '12-month guarantee', line: 'On all our workmanship' },
];

/* -------------------------------------------------------------------------- */
/* Services and pricing                                                       */
/* -------------------------------------------------------------------------- */

export const servicesSection = {
  heading: 'Locksmith services, priced openly',
  intro: 'Every service shows a starting price. Your exact fixed price is confirmed before we set off.',
  everyJobIncludes:
    'Every job includes: fixed price confirmed first, ID on arrival, tidy-up, a written receipt and our 12-month workmanship guarantee.',
};

export interface Service {
  id: string;
  icon: IconKey;
  name: string;
  fromPrice: number;
  description: string;
  included: readonly [string, string, string];
}

export const services: readonly Service[] = [
  {
    id: 'lockout',
    icon: 'door',
    name: 'Emergency Lockout',
    fromPrice: 65,
    description: 'Locked out of your home? We get you back in, usually without damaging your lock.',
    included: [
      'Non-destructive entry attempted first',
      'Available any time, day or night',
      'Lock left fully working',
    ],
  },
  {
    id: 'rekey',
    icon: 'key',
    name: 'Lock Change or Re-key',
    fromPrice: 85,
    description: 'New locks fitted or your existing ones re-keyed so old keys no longer work.',
    included: [
      'New cylinder fitted or existing lock re-keyed',
      'New keys supplied',
      'Ideal after lost keys or moving in',
    ],
  },
  {
    id: 'bs3621',
    icon: 'shield',
    name: 'Insurance-Approved Locks (BS3621)',
    fromPrice: 120,
    description: 'British Standard mortice locks that meet typical home insurance requirements.',
    included: [
      'Lock supplied and fitted',
      'Meets most insurer requirements (check your policy)',
      'Written receipt provided',
    ],
  },
  {
    id: 'upvc',
    icon: 'wrench',
    name: 'uPVC Door & Multipoint Repair',
    fromPrice: 75,
    description: 'Fixes stuck, loose or jammed handles and locking mechanisms.',
    included: [
      'Parts supplied and fitted',
      'Smooth operation tested before we leave',
      'Often repaired without replacing the whole door',
    ],
  },
  {
    id: 'burglary',
    icon: 'hammer',
    name: 'Post-Burglary Repair & Board-Up',
    fromPrice: 95,
    description: 'Fast response to secure your home after a break-in.',
    included: [
      'Door or window secured the same visit',
      'Photos of damage taken for your insurer',
      'Locks replaced or upgraded on request',
    ],
  },
  {
    id: 'landlord',
    icon: 'building',
    name: 'Landlord & Letting Agent Lock Changes',
    fromPrice: 70,
    description: 'Tenant changeover re-keys, simple and quick.',
    included: [
      'Multi-property rates available',
      'Invoice and key log provided',
      'Flexible booking around tenant availability',
    ],
  },
];

export interface PriceTier {
  id: string;
  name: string;
  summary: string;
  fromPrice: number;
  features: readonly string[];
  highlighted?: boolean;
  tag?: string;
}

export const pricing = {
  heading: "What you'll pay",
  intro:
    'Every service shows a "from" price. We confirm the exact fixed price before any work starts, so you can say no.',
  factorsHeading: 'What affects the price',
  factors: [
    { id: 'lock', icon: 'lock' as IconKey, label: 'Lock type', line: 'Standard, insurance-approved or high-security' },
    { id: 'door', icon: 'door' as IconKey, label: 'Door type', line: 'uPVC, composite or timber' },
    { id: 'parts', icon: 'tools' as IconKey, label: 'Parts needed', line: 'Cylinders, handles, keeps or a full lock' },
    { id: 'time', icon: 'phone' as IconKey, label: 'Time of day', line: 'Out-of-hours calls cost a little more' },
  ],
  // \u2060 (word joiner) keeps "+£30" from splitting across two lines.
  outOfHours: 'Evenings, nights and bank holidays: +\u2060£30, confirmed upfront.',
  calloutIncluded: 'The call-out is included in your fixed price. No separate call-out charge, no hidden extras.',
  tiersHeading: 'Choosing a lock',
  tiers: [
    {
      id: 'essential',
      name: 'Essential',
      summary: 'Standard lock',
      fromPrice: 85,
      features: ['Standard lock, supplied and fitted', 'New keys supplied'],
    },
    {
      id: 'recommended',
      name: 'Recommended',
      summary: 'BS3621 insurance-approved lock',
      fromPrice: 120,
      features: [
        'British Standard BS3621 mortice lock',
        'Meets most insurer requirements (check your policy)',
        'Written receipt provided',
      ],
      highlighted: true,
      tag: 'Most popular',
    },
    {
      id: 'premium',
      name: 'Premium',
      summary: 'High-security anti-snap lock',
      fromPrice: 180,
      features: ['High-security anti-snap lock', 'Lock supplied and fitted'],
    },
  ] as readonly PriceTier[],
  paymentLine: 'Pay by card or cash when the job is done. No deposit for standard jobs.',
  landlordLine: 'Managing several properties? Ask about multi-property rates in the form.',
  disclaimer:
    "Prices shown are illustrative 'from' prices. Your exact fixed price is confirmed before any work begins.",
};

/* -------------------------------------------------------------------------- */
/* How it works                                                               */
/* -------------------------------------------------------------------------- */

export const howItWorks = {
  heading: 'How it works',
  steps: [
    {
      id: 'request',
      icon: 'clipboard' as IconKey,
      title: 'Request your price',
      body: 'Tell us what has happened and where you are. Just two quick steps.',
      badge: '60 seconds',
    },
    {
      id: 'confirm',
      icon: 'phone' as IconKey,
      title: 'Confirm the fixed price',
      body: 'We call you back with an exact price and arrival time. You say yes or no.',
      badge: 'Callback in 10 minutes',
    },
    {
      id: 'fix',
      icon: 'key' as IconKey,
      title: 'We arrive and fix it',
      body: 'We show ID, do the job, tidy up and give you a written receipt.',
      badge: 'At your door in 30-45 min',
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Guarantee                                                                  */
/* -------------------------------------------------------------------------- */

// Client must confirm each promise before launch.
export const guarantee = {
  heading: 'Our promises, in writing.',
  cards: [
    {
      id: 'fixed-price',
      icon: 'pound' as IconKey,
      title: 'Fixed Price Promise',
      body: 'The price we confirm before we start is the price you pay. If the job turns out different, we stop and ask you first. No surprises on the bill.',
    },
    {
      id: 'gentle-entry',
      icon: 'door' as IconKey,
      title: 'Gentle Entry Promise',
      body: 'We always try non-destructive entry first. If we damage your door or lock getting you in, we repair or replace it at no cost to you.',
    },
    {
      id: 'workmanship',
      icon: 'badge' as IconKey,
      title: '12-Month Workmanship Guarantee',
      body: "If a lock we fitted develops a fault from our workmanship in the first 12 months, we'll fix it free of charge.",
    },
    {
      id: 'honest',
      icon: 'handshake' as IconKey,
      title: 'Honest Locksmith Promise',
      body: "You'll see our ID before we begin, and we'll never upsell what you don't need.",
    },
  ],
  smallPrint:
    'Applies to work carried out by Whitaker Locksmiths. Does not cover misuse, forced entry by others, or parts with a separate manufacturer warranty.',
};

/* -------------------------------------------------------------------------- */
/* Social proof (all fictional)                                               */
/* -------------------------------------------------------------------------- */

export const socialProof = {
  heading: 'Trusted by Leeds homeowners',
  beforeAfterHeading: 'Before and after',
  storiesHeading: 'How it went',
  reviewsHeading: 'What customers say',
};

export interface Stat {
  id: string;
  value: number;
  decimals: number;
  prefix: string;
  suffix: string;
  label: string;
}

export const stats: readonly Stat[] = [
  { id: 'jobs', value: 2400, decimals: 0, prefix: '', suffix: '+', label: 'jobs completed' },
  {
    id: 'rating',
    value: googleReviews.rating,
    decimals: 1,
    prefix: '',
    suffix: '',
    label: `average rating from ${googleReviews.count} reviews`,
  },
  { id: 'arrival', value: 32, decimals: 0, prefix: '', suffix: ' min', label: 'average arrival time' },
  { id: 'fees', value: 0, decimals: 0, prefix: '£', suffix: '', label: 'hidden fees' },
];

export interface BeforeAfterItem {
  id: string;
  jobType: string;
  caption: string;
  before: ImageId;
  after: ImageId;
  ariaLabel: string;
}

export const beforeAfter: readonly BeforeAfterItem[] = [
  {
    id: 'breakin',
    jobType: 'Break-in repair',
    caption: 'Door damaged after a break-in. Repaired, reinforced and secured the same night.',
    before: 'breakin-before',
    after: 'breakin-after',
    ariaLabel: 'Before and after comparison: break-in damage repaired and secured',
  },
];

export interface Story {
  id: string;
  icon: IconKey;
  title: string;
  problem: string;
  action: string;
  result: string;
}

export const stories: readonly Story[] = [
  {
    id: 'locked-out',
    icon: 'door',
    title: 'Locked out at 11pm',
    problem: 'A mum with a toddler was locked out in the rain.',
    action: 'Gave a fixed price over the phone and arrived in 28 minutes. Opened the door without damage.',
    result: 'Back inside in under 10 minutes, lock still working.',
  },
  {
    id: 'new-house',
    icon: 'key',
    title: 'Moving into a new house',
    problem: 'A new homeowner with no idea who else held keys.',
    action: 'Re-keyed both external locks in one visit.',
    result: 'Only they hold keys, secured the same day.',
  },
  {
    id: 'break-in',
    icon: 'hammer',
    title: 'After a break-in',
    problem: 'A burglary left a splintered door frame.',
    action: 'Repaired the frame, fitted a BS3621 lock and photographed the damage for the insurer.',
    result: 'Secure the same night, and the insurance claim went through.',
  },
];

export interface Review {
  id: string;
  name: string;
  area: string;
  service: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

// Dummy reviews. Replace with real, verifiable reviews before launch.
export const reviews: readonly Review[] = [
  {
    id: 'sarah',
    name: 'Sarah M.',
    area: 'Headingley',
    service: 'Emergency Lockout',
    quote:
      'Locked out on a freezing night. Got a clear price on the phone and Danny was here in 30 minutes. Door open with no damage. Brilliant.',
    rating: 5,
  },
  {
    id: 'james',
    name: 'James T.',
    area: 'Morley',
    service: 'Lock Change',
    quote:
      'Had the locks changed after buying our house. Quick, tidy, and he explained everything. Price was exactly what was quoted.',
    rating: 5,
  },
  {
    id: 'priya',
    name: 'Priya K.',
    area: 'Chapel Allerton',
    service: 'Post-Burglary Repair',
    quote:
      'After our break-in I was dreading the cost. Fixed price, secured the door that night and photographed everything for the insurer.',
    rating: 5,
  },
  {
    id: 'mark',
    name: 'Mark D.',
    area: 'Pudsey',
    service: 'uPVC Repair',
    quote: "Our uPVC door handle had been sticking for months. Fixed in 20 minutes. Wish I'd called sooner.",
    rating: 5,
  },
  {
    id: 'helen',
    name: 'Helen R.',
    area: 'Roundhay',
    service: 'Insurance-Approved Locks',
    quote:
      'Needed BS3621 locks for my insurance. He fitted them and gave me a receipt to send to the insurer. Very professional.',
    rating: 5,
  },
  {
    id: 'tom',
    name: 'Tom W.',
    area: 'Horsforth',
    service: 'Landlord Lock Change',
    quote: 'I manage four rental properties. Quick turnaround every time and invoices are always clear.',
    rating: 5,
  },
];

/* -------------------------------------------------------------------------- */
/* Meet Danny                                                                 */
/* -------------------------------------------------------------------------- */

export const meetDanny = {
  heading: 'Meet Danny',
  portrait: 'danny-portrait' as ImageId,
  caption: 'Daniel "Danny" Whitaker, owner',
  blurb:
    "I've been a locksmith for 17 years, and I started this business because too many people get overcharged when they're at their most stressed. When you call, you'll get a fixed price before I set off, and I'll show you my ID when I arrive. No surprises, no pressure, just a door that works.",
  tagline: "17 years' experience. Locks fitted properly the first time.",
  facts: ['Started as an apprentice', 'Self-employed since 2015', 'Leeds-based'],
};

/* -------------------------------------------------------------------------- */
/* Coverage                                                                   */
/* -------------------------------------------------------------------------- */

export const coverage = {
  heading: 'Areas we cover',
  note: "Not listed? Request a price and we'll tell you straight away if we can reach you.",
};

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/** Seven questions only: the ones that decide whether someone picks up the phone or fills in the form. */
export const faq = {
  heading: 'Questions people ask before they call',
  items: [
    {
      id: 'callout',
      question: 'Do you charge a call-out fee?',
      answer: "No separate call-out fee. It's included in your fixed price, which we confirm before we set off.",
    },
    {
      id: 'price-rise',
      question: "How do I know the price won't go up when you arrive?",
      answer:
        'We confirm a fixed price first. If the job turns out to be different, we stop, explain, and only carry on if you say yes.',
    },
    {
      id: 'genuine',
      question: "How do I know you're a genuine locksmith?",
      answer:
        "We show photo ID on arrival, are Enhanced DBS checked and fully insured (£2m public liability). We'll also give you our name when you call, so you know who's coming.",
    },
    {
      id: 'how-fast',
      question: 'How fast can you get to me?',
      answer:
        "Typically 30-45 minutes across our area, day or night. We'll give you a realistic arrival time when we call you back.",
    },
    {
      id: 'nights',
      question: 'Do you work nights, weekends and bank holidays?',
      answer: 'Yes, 24/7. An out-of-hours supplement applies and is always confirmed upfront.',
    },
    {
      id: 'damage-door',
      question: 'Will you damage my door?',
      answer:
        'We try non-destructive entry first and it works most of the time. If we do cause damage, we repair it free of charge.',
    },
    {
      id: 'proof',
      question: 'Do you need proof that I live here?',
      answer:
        'Yes, for your security as much as ours. A utility bill, photo ID or similar is fine. It stops anyone else getting into your home.',
    },
  ] as readonly FaqItem[],
};

/* -------------------------------------------------------------------------- */
/* Final CTA and footer                                                       */
/* -------------------------------------------------------------------------- */

export const finalCta = {
  headline: 'Get your fixed price in 60 seconds',
  support: 'No obligation. No hidden call-out charge.',
};

export const footerContent = {
  brandLine: 'Honest, fixed-price locksmith work across Leeds and West Yorkshire.',
  microTagline: "Meet Danny: 17 years' experience, one fixed price, no surprises.",
  badges: ['DBS checked', '£2m insured', '12-month guarantee'],
};
