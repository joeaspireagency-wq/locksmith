import { useState } from 'react';
import type { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CTA_LABEL, PHONE_HREF, SITE } from '../config/site';
import { quoteForm } from '../data/placeholderContent';
import { quoteRequestSchema, submitQuote } from '../services/submitQuote';
import type { QuoteRequest } from '../services/submitQuote';
import { cn } from '../lib/cn';
import { ctaClasses } from './ui/CtaButton';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  CircleAlert,
  CircleCheck,
  ICONS,
  LoaderCircle,
  PhoneCall,
} from './ui/icons';

type Step = 1 | 2;
type Status = 'idle' | 'submitting' | 'success' | 'error';

const INPUT =
  'block min-h-12 w-full rounded-lg border border-slate/60 bg-white px-3.5 text-base text-navy ' +
  'placeholder:text-slate aria-invalid:border-2 aria-invalid:border-navy';

const LABEL = 'mb-1.5 block text-sm font-semibold text-navy';

function focusById(id: string): void {
  // Wait one tick so React has applied the step change before we move focus.
  window.setTimeout(() => document.getElementById(id)?.focus(), 0);
}

function FieldError({ name, message }: { name: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={`quote-${name}-error`} role="alert" className="mt-1.5 flex items-start gap-1.5 text-sm font-semibold text-navy">
      <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </p>
  );
}

/**
 * Two-step quote form, shown inside QuoteModal. Validated with react-hook-form + zod, submitted through
 * src/services/submitQuote.ts. In this prototype the submission is mocked: no data
 * leaves the browser and nothing is stored.
 */
export function QuoteForm() {
  const [step, setStep] = useState<Step>(1);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    formState: { errors },
  } = useForm<QuoteRequest>({
    resolver: zodResolver(quoteRequestSchema),
    mode: 'onTouched',
    defaultValues: {
      postcode: '',
      name: '',
      phone: '',
      preferredTime: 'asap',
      preferredDate: '',
      notes: '',
    },
  });

  const preferredTime = watch('preferredTime');
  const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD, local time

  const goToStep = (next: Step) => {
    setStep(next);
    focusById(`quote-step-${next}`);
  };

  const goNext = async () => {
    const valid = await trigger('jobType');
    if (valid) goToStep(2);
  };

  const onSubmit = async (values: QuoteRequest) => {
    setStatus('submitting');
    setErrorMessage('');
    const result = await submitQuote(values);
    if (result.status === 'success') {
      setStatus('success');
      focusById('quote-success');
    } else {
      setStatus('error');
      setErrorMessage(result.message);
    }
  };

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Pressing Enter on step 1 moves on instead of validating fields that are not showing yet.
    if (step === 1) {
      event.preventDefault();
      void goNext();
      return;
    }
    void handleSubmit(onSubmit)(event);
  };

  const startAgain = () => {
    reset();
    setStatus('idle');
    setErrorMessage('');
    setStep(1);
    focusById('quote-step-1');
  };

  const invalid = (name: keyof QuoteRequest) => (errors[name] ? true : undefined);
  const describedBy = (name: keyof QuoteRequest) => (errors[name] ? `quote-${name}-error` : undefined);

  return (
    <div className="p-5 pt-6 text-navy sm:p-7 sm:pt-8">
      <h2 id="quote-heading" className="pr-12 text-2xl font-extrabold tracking-tight sm:text-[1.75rem]">
        {quoteForm.heading}
      </h2>

      {status === 'success' ? (
        <div id="quote-success" tabIndex={-1} className="py-8 text-center">
          <CircleCheck className="mx-auto size-14 text-navy" strokeWidth={1.75} aria-hidden="true" />
          <p className="mt-5 text-xl font-bold leading-snug">{quoteForm.success}</p>
          <p className="mt-4 text-slate">
            Need us sooner? Call{' '}
            <a href={PHONE_HREF} className="font-bold text-navy underline underline-offset-4">
              {SITE.phone}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={startAgain}
            className="mt-5 inline-flex min-h-12 items-center rounded-lg px-3 text-base font-semibold text-slate underline underline-offset-4"
          >
            Start a new request
          </button>
        </div>
      ) : (
        <form noValidate onSubmit={onFormSubmit} aria-describedby="quote-reassurance">
          <div className="mt-3">
            <p className="text-sm font-semibold text-slate" aria-live="polite">
              Step {step} of 2
            </p>
            <div className="mt-2 grid grid-cols-2 gap-1.5" aria-hidden="true">
              <span className="h-1.5 rounded-full bg-navy" />
              <span className={cn('h-1.5 rounded-full', step === 2 ? 'bg-navy' : 'bg-slate/25')} />
            </div>
          </div>

          {/* Step 1: both steps stay mounted (just hidden) so entered values are never lost. */}
          <div hidden={step !== 1} className="mt-5">
            <h3 id="quote-step-1" tabIndex={-1} className="text-xl font-bold">
              {quoteForm.step1Title}
            </h3>
            <fieldset className="mt-4">
              <legend className="sr-only">{quoteForm.step1Title}</legend>
              <div className="grid gap-2.5">
                {quoteForm.jobOptions.map((option) => {
                  const Icon = ICONS[option.icon];
                  return (
                    <label key={option.value} className="group relative block cursor-pointer">
                      <input
                        type="radio"
                        value={option.value}
                        aria-describedby={describedBy('jobType')}
                        className="peer sr-only"
                        {...register('jobType')}
                      />
                      <span
                        className={
                          'flex min-h-14 items-center gap-3 rounded-lg border-2 border-slate/30 bg-white px-4 py-2 ' +
                          'text-base font-semibold text-navy transition-colors hover:border-slate ' +
                          'peer-checked:border-navy peer-checked:bg-offwhite ' +
                          'peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-navy ' +
                          'peer-focus-visible:shadow-[0_0_0_5px_var(--color-white)]'
                        }
                      >
                        <Icon className="size-5 shrink-0 text-slate" aria-hidden="true" />
                        <span className="flex-1">{option.label}</span>
                        <span
                          aria-hidden="true"
                          className={
                            'inline-flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-slate/40 ' +
                            'group-has-[input:checked]:border-navy group-has-[input:checked]:bg-navy'
                          }
                        >
                          <span className="size-2 rounded-full bg-white opacity-0 group-has-[input:checked]:opacity-100" />
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
              <FieldError name="jobType" message={errors.jobType?.message} />
            </fieldset>
            <button
              type="button"
              onClick={() => void goNext()}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-navy px-6 text-base font-bold text-white transition hover:brightness-125 active:scale-[0.98]"
            >
              Continue
              <ArrowRight className="size-5" aria-hidden="true" />
            </button>
          </div>

          {/* Step 2 */}
          <div hidden={step !== 2} className="mt-3">
            <button
              type="button"
              onClick={() => goToStep(1)}
              className="-ml-2 inline-flex min-h-12 items-center gap-1.5 rounded-lg px-2 text-base font-semibold text-slate"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back
            </button>
            <h3 id="quote-step-2" tabIndex={-1} className="text-xl font-bold">
              {quoteForm.step2Title}
            </h3>

            <div className="mt-4 grid gap-4">
              <div>
                <label htmlFor="quote-postcode" className={LABEL}>
                  Postcode
                </label>
                <input
                  id="quote-postcode"
                  type="text"
                  autoComplete="postal-code"
                  autoCapitalize="characters"
                  spellCheck={false}
                  placeholder="LS6 1AB"
                  aria-required="true"
                  aria-invalid={invalid('postcode')}
                  aria-describedby={describedBy('postcode')}
                  className={cn(INPUT, 'uppercase placeholder:normal-case')}
                  {...register('postcode')}
                />
                <FieldError name="postcode" message={errors.postcode?.message} />
              </div>

              <div>
                <label htmlFor="quote-name" className={LABEL}>
                  Your name
                </label>
                <input
                  id="quote-name"
                  type="text"
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={invalid('name')}
                  aria-describedby={describedBy('name')}
                  className={INPUT}
                  {...register('name')}
                />
                <FieldError name="name" message={errors.name?.message} />
              </div>

              <div>
                <label htmlFor="quote-phone" className={LABEL}>
                  Phone number
                </label>
                <input
                  id="quote-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="07700 900417"
                  aria-required="true"
                  aria-invalid={invalid('phone')}
                  aria-describedby={describedBy('phone')}
                  className={INPUT}
                  {...register('phone')}
                />
                <FieldError name="phone" message={errors.phone?.message} />
              </div>

              <div>
                <label htmlFor="quote-preferredTime" className={LABEL}>
                  Preferred time <span className="font-normal text-slate">(optional)</span>
                </label>
                <div className="relative">
                  <select
                    id="quote-preferredTime"
                    aria-invalid={invalid('preferredTime')}
                    aria-describedby={describedBy('preferredTime')}
                    className={cn(INPUT, 'appearance-none pr-11')}
                    {...register('preferredTime')}
                  >
                    {quoteForm.timeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3.5 top-1/2 size-5 -translate-y-1/2 text-slate"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {preferredTime === 'choose-date' ? (
                <div>
                  <label htmlFor="quote-preferredDate" className={LABEL}>
                    Which date?
                  </label>
                  <input
                    id="quote-preferredDate"
                    type="date"
                    min={today}
                    aria-required="true"
                    aria-invalid={invalid('preferredDate')}
                    aria-describedby={describedBy('preferredDate')}
                    className={INPUT}
                    {...register('preferredDate')}
                  />
                  <FieldError name="preferredDate" message={errors.preferredDate?.message} />
                </div>
              ) : null}

              <div>
                <label htmlFor="quote-notes" className={LABEL}>
                  Anything we should know? <span className="font-normal text-slate">(optional)</span>
                </label>
                <textarea
                  id="quote-notes"
                  rows={3}
                  maxLength={500}
                  placeholder="For example: I'm not at the property, or I manage several properties."
                  aria-invalid={invalid('notes')}
                  aria-describedby={describedBy('notes')}
                  className={cn(INPUT, 'min-h-24 resize-y py-3')}
                  {...register('notes')}
                />
                <FieldError name="notes" message={errors.notes?.message} />
              </div>
            </div>

            {status === 'error' ? (
              <div
                role="alert"
                className="mt-5 flex items-start gap-3 rounded-lg border-2 border-navy bg-offwhite p-4 text-base font-semibold"
              >
                <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <div>
                  <p>{errorMessage}</p>
                  <a
                    href={PHONE_HREF}
                    className="mt-2 inline-flex min-h-12 items-center gap-2 font-bold underline underline-offset-4"
                  >
                    <PhoneCall className="size-4" aria-hidden="true" />
                    {SITE.phone}
                  </a>
                </div>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={status === 'submitting'}
              aria-busy={status === 'submitting'}
              className={cn(ctaClasses('lg', true), 'mt-5')}
            >
              {status === 'submitting' ? (
                <>
                  <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
                  <span>Sending your request</span>
                </>
              ) : (
                CTA_LABEL
              )}
            </button>
            <p id="quote-reassurance" className="mt-3 text-center text-sm text-slate">
              {quoteForm.reassurance}
            </p>
            {SITE.demoMode ? <p className="mt-1 text-center text-sm text-slate">{quoteForm.demoNote}</p> : null}
          </div>
        </form>
      )}
    </div>
  );
}
