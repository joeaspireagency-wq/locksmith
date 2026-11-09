import { useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import { QuoteForm } from './QuoteForm';
import { X } from './ui/icons';

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * The quote form in a pop-up. Built on the native <dialog> element, so the browser provides
 * the focus trap, makes the rest of the page inert, closes on Escape and returns focus to the
 * button that opened it. We add: click-outside to close, page scroll lock, and a fresh form
 * every time (the form is only mounted while open).
 */
export function QuoteModal({ open, onClose }: QuoteModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Lock the page behind the pop-up, and keep the layout from jumping when the scrollbar goes.
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="quote-heading"
      onClose={onClose}
      onClick={(event: MouseEvent<HTMLDialogElement>) => {
        // A click on the dimmed backdrop lands on the <dialog> itself, not on the panel inside it.
        if (event.target === event.currentTarget) onClose();
      }}
      className="quote-dialog m-auto max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] max-w-lg overflow-y-auto overscroll-contain rounded-2xl bg-white p-0 text-navy shadow-2xl backdrop:bg-navy/75 sm:max-h-[calc(100dvh-3rem)]"
    >
      <div className="relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-2 top-2 z-10 inline-flex size-12 items-center justify-center rounded-lg text-slate transition hover:bg-offwhite hover:text-navy sm:right-3 sm:top-3"
        >
          <X className="size-6" aria-hidden="true" />
        </button>
        {open ? <QuoteForm /> : null}
      </div>
    </dialog>
  );
}
