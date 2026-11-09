import { pricing } from '../data/placeholderContent';
import { cn } from '../lib/cn';
import { Reveal } from './ui/Reveal';
import { Check, CircleCheck, Clock, ICONS } from './ui/icons';

/**
 * "What you'll pay" block, shown directly beneath the services grid. Kept compact on purpose:
 * a heading and one line, four small "what affects the price" chips, one line of small-print
 * out-of-hours and call-out notes, three lock tiers, then the small print.
 * Plain navy, slate and white only: no amber, no countdowns, no was/now pricing.
 */
export function Pricing() {
  return (
    <div className="mt-10 rounded-xl bg-offwhite p-4 sm:p-6 lg:p-8" aria-labelledby="pricing-heading" role="group">
      <div className="mx-auto max-w-3xl text-center">
        <h3 id="pricing-heading" className="text-2xl font-extrabold tracking-tight text-navy md:text-3xl">
          {pricing.heading}
        </h3>
        <p className="mt-2 text-base text-slate md:text-lg">{pricing.intro}</p>
      </div>

      {/* What affects the price: small chips, label only on phones. */}
      <h4 className="mt-6 text-center text-sm font-bold uppercase tracking-[0.14em] text-slate">
        {pricing.factorsHeading}
      </h4>
      <ul className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-3">
        {pricing.factors.map((factor) => {
          const Icon = ICONS[factor.icon];
          return (
            <li key={factor.id} className="flex items-center gap-2.5 rounded-lg bg-white px-3 py-2.5">
              <Icon className="size-5 shrink-0 text-slate" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-base font-bold leading-snug text-navy">{factor.label}</span>
                <span className="hidden text-sm leading-snug text-slate lg:block">{factor.line}</span>
              </span>
            </li>
          );
        })}
      </ul>

      {/* Out-of-hours and call-out notes: deliberately small print, quieter than the boxes above. */}
      <div className="mx-auto mt-3 flex max-w-3xl flex-col gap-1.5 text-sm text-slate md:flex-row md:justify-center md:gap-x-8">
        <p className="flex items-start gap-2">
          <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span className="text-pretty">{pricing.outOfHours}</span>
        </p>
        <p className="flex items-start gap-2">
          <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span className="text-pretty">{pricing.calloutIncluded}</span>
        </p>
      </div>

      {/* Good / better / best */}
      <h4 className="mt-7 text-center text-sm font-bold uppercase tracking-[0.14em] text-slate">
        {pricing.tiersHeading}
      </h4>
      <ul className="mt-5 grid items-stretch gap-5 md:grid-cols-3 md:gap-4 lg:gap-5">
        {pricing.tiers.map((tier, index) => (
          <li key={tier.id} className="flex">
            <Reveal delay={index * 80} className="flex w-full">
              <article
                className={cn(
                  'relative flex w-full flex-col rounded-xl bg-white p-4 md:p-5',
                  tier.highlighted ? 'border-[3px] border-navy pt-6 shadow-lg md:-my-2' : 'border border-slate/30',
                )}
              >
                {tier.tag ? (
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-navy px-3.5 py-0.5 text-sm font-bold text-white">
                    {tier.tag}
                  </span>
                ) : null}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h5 className="text-lg font-bold text-navy md:text-xl">{tier.name}</h5>
                    <p className="text-[0.95rem] leading-snug text-slate">{tier.summary}</p>
                  </div>
                  <p className="flex shrink-0 flex-col items-end leading-none">
                    <span className="text-xs font-medium text-slate">from</span>
                    <span className="mt-0.5 text-3xl font-extrabold text-navy">£{tier.fromPrice}</span>
                  </p>
                </div>
                <ul className="mt-3 space-y-1.5 border-t border-slate/20 pt-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-[0.95rem] leading-snug text-navy">
                      <Check className="mt-0.5 size-4 shrink-0 text-slate" strokeWidth={3} aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>

      {/* Payment and landlord notes, then the always-visible disclaimer. */}
      <div className="mx-auto mt-6 max-w-3xl space-y-1 text-center text-[0.95rem] text-navy">
        <p className="font-semibold">{pricing.paymentLine}</p>
        <p className="text-slate">{pricing.landlordLine}</p>
      </div>
      <p className="mx-auto mt-4 max-w-3xl border-t border-slate/25 pt-3 text-center text-sm text-slate">
        {pricing.disclaimer}
      </p>
    </div>
  );
}
