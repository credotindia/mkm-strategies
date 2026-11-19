import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Get In Touch",
  description:
    "Tell MKM Strategies what you're trying to move forward. We review every enquiry and determine the appropriate next step.",
};

export default function ContactPage() {
  return (
    <section className="page-x grid gap-12 py-20 lg:grid-cols-2">
      <div>
        <p className="eyebrow">Get In Touch</p>
        <h1 className="text-navy">
          Tell us what you&apos;re trying to move forward.
        </h1>
        <p className="max-w-xl">
          Whether you are evaluating a market, considering a transaction, exploring an opportunity or progressing a
          project, tell us what you are trying to achieve. MKM will review your enquiry and determine the appropriate
          next step.
        </p>
        <dl className="mt-10 space-y-4 text-sm">
          <div>
            <dt className="font-semibold">Email</dt>
            <dd>
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Phone / WhatsApp</dt>
            <dd>
              <a href={site.contact.phone.href}>{site.contact.phone.display}</a>
            </dd>
          </div>
        </dl>
      </div>
      <ContactForm />
    </section>
  );
}
