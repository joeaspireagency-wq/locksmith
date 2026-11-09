import { useEffect } from 'react';
import { SEO } from './config/site';
import { QuoteModalProvider } from './context/QuoteModalContext';
import { Coverage } from './components/Coverage';
import { Faq } from './components/Faq';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { Guarantee } from './components/Guarantee';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { MeetDanny } from './components/MeetDanny';
import { Services } from './components/Services';
import { StickyBar } from './components/StickyBar';
import { TrustStrip } from './components/TrustStrip';
import { SocialProof } from './components/social/SocialProof';

/**
 * Single-scroll page, top to bottom:
 * header, hero, trust strip, services & pricing, how it works, guarantee,
 * social proof, meet Danny, coverage, FAQ, final CTA, footer.
 * No router: every CTA opens the quote form in a pop-up (QuoteModal).
 */
export default function App() {
  // Keep the document title and description editable from src/config/site.ts.
  useEffect(() => {
    document.title = SEO.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', SEO.description);
  }, []);

  return (
    <QuoteModalProvider>
      {/* Bottom padding on phones so the sticky bar (z-40) never covers the footer. */}
      <div id="top" className="pb-[calc(4.75rem+env(safe-area-inset-bottom))] md:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-bold focus:text-navy"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          <Hero />
          <TrustStrip />
          <Services />
          <HowItWorks />
          <Guarantee />
          <SocialProof />
          <MeetDanny />
          <Coverage />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
        <StickyBar />
      </div>
    </QuoteModalProvider>
  );
}
