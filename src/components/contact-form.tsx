"use client";

import { useState, type FormEvent } from "react";
import { enquiryIntents, enquirySectors, type EnquiryResponse } from "@/lib/enquiry-options";

type Status =
  | { state: "idle" | "sending" | "sent" }
  | { state: "error"; message: string; fieldErrors?: Partial<Record<string, string[]>> };

const inputClass =
  "w-full rounded border border-steel bg-white px-3 py-2.5 text-sm outline-none focus:border-navy focus:ring-1 focus:ring-navy";

export function ContactForm({ opportunity }: { opportunity?: string }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const errorFor = (field: string) => (status.state === "error" ? status.fieldErrors?.[field]?.[0] : undefined);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus({ state: "sending" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = (await response.json()) as EnquiryResponse;
      if (result.ok) {
        form.reset();
        setStatus({ state: "sent" });
      } else {
        setStatus({ state: "error", message: result.error, fieldErrors: result.fieldErrors });
      }
    } catch {
      setStatus({ state: "error", message: "Network error. Please try again." });
    }
  }

  if (status.state === "sent") {
    return (
      <div role="status" className="rounded border border-mist bg-white p-8">
        <h2 className="font-display text-2xl text-navy">Thank you — your enquiry has been sent.</h2>
        <p className="mt-2 text-sm">MKM will review it and contact you about the appropriate next step.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6 rounded border border-mist bg-white p-8">
      <fieldset>
        <legend className="mb-3 text-sm font-semibold">
          I&apos;m looking to <span className="text-ember">*</span>
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {enquiryIntents.map((intent) => (
            <label key={intent} className="flex items-center gap-2 text-sm">
              <input type="radio" name="intent" value={intent} required className="accent-navy" />
              {intent}
            </label>
          ))}
        </div>
        <FieldError message={errorFor("intent")} />
      </fieldset>

      <Field label="Sector" optional error={errorFor("sector")}>
        <select name="sector" defaultValue="" className={inputClass}>
          <option value="">Select a sector</option>
          {enquirySectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" error={errorFor("name")}>
          <input name="name" autoComplete="name" required placeholder="Your full name" className={inputClass} />
        </Field>
        <Field label="Company / Organisation" optional error={errorFor("company")}>
          <input name="company" autoComplete="organization" placeholder="Company name" className={inputClass} />
        </Field>
        <Field label="Email" error={errorFor("email")}>
          <input name="email" type="email" autoComplete="email" required placeholder="you@company.com" className={inputClass} />
        </Field>
        <Field label="Phone / WhatsApp" optional error={errorFor("phone")}>
          <input name="phone" type="tel" autoComplete="tel" placeholder="+971 XX XXX XXXX" className={inputClass} />
        </Field>
      </div>

      <Field label="Briefly describe what you're trying to achieve" error={errorFor("message")}>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Tell us the objective, current situation and anything important we should understand."
          className={inputClass}
        />
      </Field>

      {opportunity ? <input type="hidden" name="opportunity" value={opportunity} /> : null}

      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <p className="rounded bg-mist/60 p-4 text-xs">
        Please do not submit confidential documents or sensitive financial information through this form.
      </p>

      {status.state === "error" ? (
        <p role="alert" className="text-sm text-ember">
          {status.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status.state === "sending"}
        className="w-full rounded bg-navy px-6 py-3.5 font-ui text-sm font-semibold text-white transition hover:bg-navy/90 disabled:opacity-60"
      >
        {status.state === "sending" ? "Sending…" : "Get In Touch"}
      </button>
    </form>
  );
}

function Field({
  label,
  optional,
  error,
  children,
}: {
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">
        {label} {optional ? <span className="font-normal text-slate">(optional)</span> : <span className="text-ember">*</span>}
      </span>
      {children}
      <FieldError message={error} />
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  return message ? <span className="mt-1 block text-xs text-ember">{message}</span> : null;
}
