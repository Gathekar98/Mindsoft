"use client";

import Link from "next/link";
import { useActionState, useId, useState } from "react";
import { submitApplication } from "@/app/actions/applications";
import type { FormState } from "@/lib/validation";

const initial: FormState = { status: "idle" };
const MAX = 4 * 1024 * 1024;

export function ApplicationForm({ jobSlug, jobTitle }: { jobSlug: string; jobTitle: string }) {
  const [state, action, pending] = useActionState(submitApplication, initial);
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const err = state.fieldErrors ?? {};
  const v = state.values ?? {};

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-center gap-4 rounded-[28px] border border-line bg-white p-10 text-center shadow-[var(--shadow-card)]">
        <span className="flex h-16 w-16 animate-ping-soft items-center justify-center rounded-full bg-mint-soft" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4L19 7" fill="none" stroke="#167A55" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <h2 className="font-display text-2xl font-extrabold">Application submitted</h2>
        <p className="max-w-lg text-slate">{state.message}</p>
        <Link href="/careers" className="btn-outline mt-2">Back to careers</Link>
      </div>
    );
  }

  const field = (name: string, label: string, opts: { type?: string; optional?: boolean; auto?: string; placeholder?: string; full?: boolean; area?: boolean; hint?: string } = {}) => (
    <div className={`flex flex-col gap-1.5 ${opts.full ? "sm:col-span-2" : ""}`}>
      <label htmlFor={id(name)} className="label">
        {label} {opts.optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {opts.area ? (
        <textarea id={id(name)} name={name} rows={6} defaultValue={v[name]} placeholder={opts.placeholder} className="field resize-y" aria-invalid={!!err[name]} aria-describedby={err[name] ? id(`${name}-e`) : undefined} />
      ) : (
        <input
          id={id(name)}
          name={name}
          type={opts.type ?? "text"}
          autoComplete={opts.auto}
          defaultValue={v[name]}
          placeholder={opts.placeholder}
          required={!opts.optional}
          className="field"
          aria-invalid={!!err[name]}
          aria-describedby={err[name] ? id(`${name}-e`) : opts.hint ? id(`${name}-h`) : undefined}
        />
      )}
      {opts.hint && !err[name] && <p id={id(`${name}-h`)} className="text-[13px] text-muted">{opts.hint}</p>}
      {err[name] && <p id={id(`${name}-e`)} className="field-error">{err[name]}</p>}
    </div>
  );

  return (
    <form
      action={action}
      noValidate
      onSubmit={(e) => {
        if (fileError) e.preventDefault();
      }}
      className="flex flex-col gap-8 rounded-[28px] border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-10"
    >
      <input type="hidden" name="jobSlug" value={jobSlug} />
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-xl bg-[#fef3f2] px-4 py-3 text-sm text-[#b42318]">{state.message}</p>
      )}

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 font-display text-lg font-bold">Personal details</legend>
        {field("fullName", "Full name", { auto: "name" })}
        {field("email", "Email address", { type: "email", auto: "email" })}
        {field("phone", "Mobile number", { type: "tel", auto: "tel", placeholder: "+91 98765 43210" })}
        {field("location", "Current city", { auto: "address-level2", placeholder: "e.g. Pune" })}
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 font-display text-lg font-bold">Education &amp; experience</legend>
        {field("education", "Highest qualification", { placeholder: "e.g. B.E. Computer Engineering, 2025" })}
        {field("experience", "Experience", { placeholder: "e.g. 2 years, or Fresher" })}
        {field("skills", "Key skills", { full: true, placeholder: "e.g. React, TypeScript, Next.js, REST APIs, Git" })}
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-3">
        <legend className="mb-4 font-display text-lg font-bold">Links</legend>
        {field("portfolioUrl", "Portfolio", { type: "url", optional: true, placeholder: "https://" })}
        {field("githubUrl", "GitHub", { type: "url", optional: true, placeholder: "https://github.com/…" })}
        {field("linkedinUrl", "LinkedIn", { type: "url", optional: true, placeholder: "https://linkedin.com/in/…" })}
      </fieldset>

      <fieldset className="grid gap-5">
        <legend className="mb-4 font-display text-lg font-bold">Resume &amp; cover letter</legend>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={id("resume")} className="label">Resume</label>
          <label
            htmlFor={id("resume")}
            className={`flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors hover:border-ocean-2 hover:bg-mist ${err.resume || fileError ? "border-[#c2410c]" : "border-[#CDEBF6]"}`}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4M7 9l5-5 5 5M4 20h16" fill="none" stroke="#0A6C9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="font-semibold">{fileName ?? "Choose a file"}</span>
            <span className="text-[13px] text-muted">PDF, DOC or DOCX · max 4 MB</span>
          </label>
          <input
            id={id("resume")}
            name="resume"
            type="file"
            required
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            aria-invalid={!!(err.resume || fileError)}
            aria-describedby={err.resume || fileError ? id("resume-e") : undefined}
            onChange={(e) => {
              const f = e.target.files?.[0];
              setFileName(f?.name ?? null);
              if (!f) return setFileError(null);
              const ok = /\.(pdf|docx?)$/i.test(f.name);
              setFileError(!ok ? "Resume must be a PDF, DOC or DOCX file." : f.size > MAX ? "Resume must be 4 MB or smaller." : null);
            }}
          />
          {(fileError || err.resume) && <p id={id("resume-e")} className="field-error">{fileError ?? err.resume}</p>}
        </div>
        {field("coverLetter", "Cover letter", { optional: true, area: true, full: true, placeholder: `Why are you interested in the ${jobTitle} role? Tell us about a project you're proud of.` })}
      </fieldset>

      <div className="flex flex-col gap-1">
        <label className="flex items-start gap-3 text-[14px] leading-relaxed text-slate">
          <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-ocean" aria-invalid={!!err.consent} aria-describedby={err.consent ? id("consent-e") : undefined} />
          <span>
            I agree to Mindsoft Tech Solutions storing my application and resume to assess my suitability for this and similar roles, as described in the{" "}
            <Link href="/privacy-policy" className="font-medium text-ocean underline">Privacy Policy</Link>.
          </span>
        </label>
        {err.consent && <p id={id("consent-e")} className="field-error">{err.consent}</p>}
      </div>

      <button type="submit" disabled={pending} className="btn-primary self-start !px-8">
        {pending ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}
