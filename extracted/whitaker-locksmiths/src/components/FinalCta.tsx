import { PHONE_HREF, SITE } from '../config/site';
import { finalCta } from '../data/placeholderContent';
import { Container } from './ui/Layout';
import { CtaButton } from './ui/CtaButton';
import { PhoneCall } from './ui/icons';

/** Final CTA banner (navy): headline, one supporting line, the CTA, and the phone number beneath. */
export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-heading" className="bg-navy py-14 text-center text-white md:py-20">
      <Container>
        <h2
          id="final-cta-heading"
          className="mx-auto max-w-3xl text-balance text-3xl font-extrabold leading-tight tracking-tight md:text-4xl lg:text-[2.75rem]"
        >
          {finalCta.headline}
        </h2>
        <p className="mt-4 text-lg text-white/85">{finalCta.support}</p>
        <div className="mt-8 flex justify-center">
          <CtaButton size="lg" />
        </div>
        <a
          href={PHONE_HREF}
          className="mt-6 inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg px-3 text-xl font-bold text-white"
        >
          <PhoneCall className="size-5 text-white/80" aria-hidden="true" />
          <span>
            <span className="font-normal text-white/80">Or call </span>
            {SITE.phone}
          </span>
        </a>
      </Container>
    </section>
  );
}
