import { PHONE_HREF, SITE, WHATSAPP_HREF } from '../config/site';
import { footerContent } from '../data/placeholderContent';
import { Logo } from './Logo';
import { Container } from './ui/Layout';
import { BadgeCheck, Mail, MapPin, MessageCircle, PhoneCall, ShieldCheck } from './ui/icons';

/**
 * Footer (navy): three columns, then the small print. No CTA here (the final banner above
 * already has one), and no social icons, blog links or extra navigation.
 */
export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <Container>
        {/* Middle row */}
        <div className="grid gap-10 border-t border-white/15 py-12 md:grid-cols-3 md:gap-8">
          <div>
            <Logo tone="dark" />
            <p className="mt-4 max-w-xs text-base text-white/80">{footerContent.brandLine}</p>
            <p className="mt-3 max-w-xs text-base font-semibold text-white">{footerContent.microTagline}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white/70">Contact</h3>
            <ul className="mt-4 space-y-1 text-base">
              <li>
                <a href={PHONE_HREF} className="inline-flex min-h-12 items-center gap-3 rounded-lg font-semibold text-white">
                  <PhoneCall className="size-5 text-white/70" aria-hidden="true" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                {/* The WhatsApp mobile is shown as a normal tap-to-call number; no extra chat button or CTA. */}
                <a href={WHATSAPP_HREF} className="inline-flex min-h-12 items-center gap-3 rounded-lg font-semibold text-white">
                  <MessageCircle className="size-5 text-white/70" aria-hidden="true" />
                  <span>
                    <span className="font-normal text-white/70">WhatsApp </span>
                    {SITE.whatsapp}
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="inline-flex min-h-12 items-center gap-3 break-all rounded-lg text-white">
                  <Mail className="size-5 shrink-0 text-white/70" aria-hidden="true" />
                  {SITE.email}
                </a>
              </li>
            </ul>
            <p className="mt-3 text-base text-white/80">{SITE.hours.emergency}</p>
            <p className="text-base text-white/80">{SITE.hours.bookings}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white/70">Areas covered</h3>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-base text-white/85">
              {SITE.areasCovered.map((area) => (
                <li key={area} className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-white/60" aria-hidden="true" />
                  {area}
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2">
              {footerContent.badges.map((badge, index) => {
                const Icon = index === 2 ? BadgeCheck : ShieldCheck;
                return (
                  <li
                    key={badge}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-white/25 bg-white/10 px-3 text-sm font-semibold"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {badge}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom row. Privacy and Terms are plain text placeholders: link them to real pages at launch. */}
        <div className="flex flex-col gap-3 border-t border-white/15 py-6 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <span>Privacy Policy</span>
            <span>Terms</span>
            <span>{SITE.companyNumber}</span>
            <span>{SITE.icoNumber}</span>
          </p>
          <p>
            &copy; {SITE.copyrightYear} {SITE.businessName}
          </p>
        </div>
      </Container>
    </footer>
  );
}
