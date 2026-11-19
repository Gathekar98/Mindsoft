"use client";

import { useActionState, useId } from "react";
import { submitLead } from "@/app/actions/leads";
import { budgetOptions, timelineOptions, type FormState } from "@/lib/validation";
import { serviceOptions } from "@/lib/services";
import Link from "next/link";

const initial: FormState = { status: "idle" };

interface Props {
  type: "CONTACT" | "QUOTE";
  defaultService?: string;
  sourcePage?: string;
  compact?: boolean;
  submitLabel?: string;
}

export function LeadForm({ type, defaultService, sourcePage, compact = false, submitLabel }: Props) {
  const [state, action, pending] = useActionState(submitLead, initial);
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const err = state.fieldErrors ?? {};
  const v = state.values ?? {};

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-[22px] bg-white p-8 text-navy">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mint-soft" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24">
            <path d="M5 12.5l4.5 4L19 7" fill="none" stroke="#167A55" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="font-display text-2xl font-extrabold">Message received</h3>
        <p className="text-slate">{state.message}</p>
        <Link href="/services" className="text-sm font-semibold text-ocean">
          Explore our services while you wait →
        </Link>
      </div>
    );
  }

  const isQuote = type === "QUOTE";

  return (
    <form action={action} noValidate className="grid gap-4 rounded-[22px] bg-white p-6 text-navy sm:grid-cols-2 sm:p-8">
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="sourcePage" value={sourcePage ?? ""} />
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-xl bg-[#fef3f2] px-4 py-3 text-sm text-[#b42318] sm:col-span-2">
          {state.message}
        </p>
      )}

      <Field id={id("name")} label="Full name" error={err.name}>
        <input id={id("name")} name="name" autoComplete="name" required defaultValue={v.name} className="field" aria-invalid={!!err.name} aria-describedby={err.name ? id("name-e") : undefined} />
      </Field>
      <Field id={id("email")} label="Work email" error={err.email}>
        <input id={id("email")} name="email" type="email" autoComplete="email" required defaultValue={v.email} className="field" aria-invalid={!!err.email} aria-describedby={err.email ? id("email-e") : undefined} />
      </Field>
      <Field id={id("phone")} label="Phone / WhatsApp" optional error={err.phone}>
        <input id={id("phone")} name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} placeholder="+91" className="field" aria-invalid={!!err.phone} aria-describedby={err.phone ? id("phone-e") : undefined} />
      </Field>
      <Field id={id("company")} label="Company" optional error={err.company}>
        <input id={id("company")} name="company" autoComplete="organization" defaultValue={v.company} className="field" />
      </Field>

      <Field id={id("service")} label={isQuote ? "What do you need?" : "Topic"} optional={!isQuote} error={err.service}>
        <select id={id("service")} name="service" defaultValue={v.service ?? defaultService ?? ""} className="field" aria-invalid={!!err.service} aria-describedby={err.service ? id("service-e") : undefined}>
          <option value="">{isQuote ? "Choose a service" : "General enquiry"}</option>
          {serviceOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
          <option value="not-sure">Not sure yet</option>
        </select>
      </Field>

      {isQuote && (
        <Field id={id("budget")} label="Estimated budget" optional>
          <select id={id("budget")} name="budget" defaultValue={v.budget ?? ""} className="field">
            <option value="">Prefer not to say</option>
            {budgetOptions.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </Field>
      )}

      {isQuote && !compact && (
        <Field id={id("timeline")} label="When would you like to start?" optional className="sm:col-span-2">
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby={`${id("timeline")}-label`}>
            {timelineOptions.map((t) => (
              <label key={t} className="cursor-pointer">
                <input type="radio" name="timeline" value={t} defaultChecked={v.timeline === t} className="peer sr-only" />
                <span className="inline-block rounded-full border border-line px-4 py-2 text-sm transition-colors peer-checked:border-ocean peer-checked:bg-ocean peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-cyan hover:border-ocean-2">
                  {t}
                </span>
              </label>
            ))}
          </div>
        </Field>
      )}

      <Field id={id("message")} label={isQuote ? "Tell us about your project" : "Your message"} error={err.message} className="sm:col-span-2">
        <textarea
          id={id("message")}
          name="message"
          rows={compact ? 3 : 5}
          required
          defaultValue={v.message}
          placeholder={isQuote ? "What would you like to build? Who is it for? Any deadlines or existing systems?" : "How can we help?"}
          className="field resize-y"
          aria-invalid={!!err.message}
          aria-describedby={err.message ? id("message-e") : undefined}
        />
      </Field>

      <div className="flex flex-col gap-1 sm:col-span-2">
        <label className="flex items-start gap-3 text-[13px] leading-relaxed text-slate">
          <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-ocean" aria-invalid={!!err.consent} aria-describedby={err.consent ? id("consent-e") : undefined} />
          <span>
            I agree to Mindsoft Tech Solutions storing these details to respond to my enquiry, as described in the{" "}
            <Link href="/privacy-policy" className="font-medium text-ocean underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {err.consent && <p id={id("consent-e")} className="field-error">{err.consent}</p>}
      </div>

      <button type="submit" disabled={pending} className="btn-primary sm:col-span-2">
        {pending ? "Sending…" : submitLabel ?? (isQuote ? "Send my request" : "Send message")}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  optional,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} id={`${id}-label`} className="label">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-e`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}
