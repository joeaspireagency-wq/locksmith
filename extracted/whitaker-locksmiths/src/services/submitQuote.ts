/**
 * Quote submission service layer.
 *
 * FRONTEND-ONLY DEMO: nothing here sends data anywhere. `mockTransport` waits a
 * moment and returns a fake receipt, so the loading, success and error states can
 * be demonstrated. No data is stored or transmitted.
 *
 * Demo tip: add ?simulate=error to the page URL to see the error state.
 *
 * ---------------------------------------------------------------------------
 * INTEGRATION POINT: to connect a real API or CRM later, write a function that
 * matches `QuoteTransport` (takes a validated QuoteRequest, resolves with the
 * receipt your backend returns) and pass it as the second argument to
 * `submitQuote`, or replace `mockTransport` below. The schemas, validation,
 * error handling and UI states around it do not need to change. Keep the
 * receipt schema in step with whatever your backend actually returns.
 * ---------------------------------------------------------------------------
 */
import { z } from 'zod';
import { SITE } from '../config/site';

/* -------------------------------------------------------------------------- */
/* Schemas and types                                                          */
/* -------------------------------------------------------------------------- */

export const JOB_TYPES = [
  'locked-out',
  'broken-lock',
  'change-locks',
  'break-in',
  'landlord',
] as const;
export type JobType = (typeof JOB_TYPES)[number];

export const PREFERRED_TIMES = ['asap', 'today', 'tomorrow', 'choose-date'] as const;
export type PreferredTime = (typeof PREFERRED_TIMES)[number];

/** Standard UK postcode pattern (including GIR 0AA), case-insensitive, optional space. */
const UK_POSTCODE =
  /^(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$/i;

/**
 * UK mobile (07...) or landline (01..., 02..., 03...), with an optional +44 / 0044
 * prefix. Spaces, hyphens and brackets are ignored before matching. Numbers must be
 * the standard 11 digits (10 after the leading 0), so a mistyped number is caught
 * instead of accepted. A few rare legacy 10-digit 01 numbers are therefore rejected.
 */
const UK_PHONE = /^(?:\+44|0044|0)(?:7[1-57-9]\d{8}|[123]\d{9})$/;

export const quoteRequestSchema = z
  .object({
    jobType: z.enum(JOB_TYPES, {
      message: "Please choose what's happened so we can price it correctly.",
    }),
    postcode: z
      .string()
      .trim()
      .min(1, 'Please enter the postcode where you need us.')
      .regex(UK_POSTCODE, 'That postcode does not look right. A UK postcode looks like LS6 1AB.'),
    name: z
      .string()
      .trim()
      .min(1, 'Please tell us your name so we know who to ask for.')
      .max(80, 'That name is a little long. Please shorten it.'),
    phone: z
      .string()
      .trim()
      .min(1, 'Please enter a phone number so we can call you back.')
      .refine(
        (value) => UK_PHONE.test(value.replace(/[\s\-()]/g, '')),
        'Please enter a UK phone number, for example 07700 900417 or 0113 496 0999.',
      ),
    preferredTime: z.enum(PREFERRED_TIMES, { message: 'Please choose a time.' }),
    preferredDate: z.string(),
    notes: z.string().max(500, 'Please keep this to 500 characters or fewer.'),
  })
  .refine((value) => value.preferredTime !== 'choose-date' || value.preferredDate.trim() !== '', {
    path: ['preferredDate'],
    message: 'Please choose a date.',
  });

export type QuoteRequest = z.infer<typeof quoteRequestSchema>;

/** What a backend would send back once it has the request. Mocked here. */
export const quoteReceiptSchema = z.object({
  reference: z.string().min(1),
  receivedAt: z.string().min(1),
});
export type QuoteReceipt = z.infer<typeof quoteReceiptSchema>;

export type SubmitQuoteResult =
  | { status: 'success'; receipt: QuoteReceipt }
  | { status: 'error'; message: string };

/** Anything that takes a validated request and resolves with a receipt-shaped value. */
export type QuoteTransport = (request: QuoteRequest) => Promise<unknown>;

export const SUBMIT_ERROR_MESSAGE = `Something went wrong. Please call us on ${SITE.phone}.`;

/* -------------------------------------------------------------------------- */
/* Mock transport (replace with a real API or CRM call later)                 */
/* -------------------------------------------------------------------------- */

const SIMULATED_DELAY_MS = 1100;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function shouldSimulateFailure(): boolean {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('simulate') === 'error';
}

/**
 * DEMO ONLY. Does not use the network and does not keep the request.
 * The parameter is intentionally unused: a real transport would send it.
 */
const mockTransport: QuoteTransport = async () => {
  await wait(SIMULATED_DELAY_MS);
  if (shouldSimulateFailure()) {
    throw new Error('Simulated failure (demo)');
  }
  return {
    reference: `WL-${Math.floor(100000 + Math.random() * 900000)}`,
    receivedAt: new Date().toISOString(),
  };
};

/* -------------------------------------------------------------------------- */
/* Public API                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Validates the request, hands it to the transport and always resolves with a
 * typed result. It never throws, so the UI only has to handle two outcomes.
 */
export async function submitQuote(
  request: QuoteRequest,
  transport: QuoteTransport = mockTransport,
): Promise<SubmitQuoteResult> {
  try {
    const parsed = quoteRequestSchema.safeParse(request);
    if (!parsed.success) {
      return { status: 'error', message: SUBMIT_ERROR_MESSAGE };
    }

    const raw = await transport(parsed.data);
    const receipt = quoteReceiptSchema.safeParse(raw);
    if (!receipt.success) {
      return { status: 'error', message: SUBMIT_ERROR_MESSAGE };
    }

    return { status: 'success', receipt: receipt.data };
  } catch {
    return { status: 'error', message: SUBMIT_ERROR_MESSAGE };
  }
}
