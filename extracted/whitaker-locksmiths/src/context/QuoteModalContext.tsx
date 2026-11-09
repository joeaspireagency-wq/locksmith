import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { QuoteModal } from '../components/QuoteModal';

interface QuoteModalApi {
  open: boolean;
  openQuote: () => void;
  closeQuote: () => void;
}

const QuoteModalContext = createContext<QuoteModalApi | null>(null);

/**
 * Owns the open/closed state of the quote pop-up and renders it once for the whole page.
 * Every CTA button calls `openQuote()` instead of scrolling to a section.
 */
export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openQuote = useCallback(() => setOpen(true), []);
  const closeQuote = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ open, openQuote, closeQuote }), [open, openQuote, closeQuote]);

  return (
    <QuoteModalContext.Provider value={value}>
      {children}
      <QuoteModal open={open} onClose={closeQuote} />
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal(): QuoteModalApi {
  const context = useContext(QuoteModalContext);
  if (!context) throw new Error('useQuoteModal must be used inside <QuoteModalProvider>');
  return context;
}
