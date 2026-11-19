import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import type { EnquiryInput } from "@/lib/enquiry-schema";

let transporter: Transporter | undefined;

function env(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function getTransporter(): Transporter {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT ?? 465);
    transporter = nodemailer.createTransport({
      host: env("SMTP_HOST"),
      port,
      secure: (process.env.SMTP_SECURE ?? String(port === 465)) === "true",
      auth: { user: env("SMTP_USER"), pass: env("SMTP_PASS") },
    });
  }
  return transporter;
}

const HTML_ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export async function sendEnquiry(data: EnquiryInput): Promise<void> {
  const fields: [label: string, value: string | undefined][] = [
    ["Looking to", data.intent],
    ["Sector", data.sector],
    ["Name", data.name],
    ["Company", data.company],
    ["Email", data.email],
    ["Phone / WhatsApp", data.phone],
    ["Opportunity ref.", data.opportunity],
  ];
  const rows = fields.filter((row): row is [string, string] => Boolean(row[1]));

  const text = [...rows.map(([label, value]) => `${label}: ${value}`), "", data.message].join("\n");
  const html = `
    <table cellpadding="6" style="border-collapse:collapse;font:14px Arial,sans-serif">
      ${rows.map(([label, value]) => `<tr><td style="color:#555;vertical-align:top"><strong>${label}</strong></td><td>${escapeHtml(value)}</td></tr>`).join("")}
    </table>
    <p style="font:14px Arial,sans-serif;white-space:pre-wrap">${escapeHtml(data.message)}</p>`;

  await getTransporter().sendMail({
    from: env("CONTACT_FROM"),
    to: env("CONTACT_TO"),
    replyTo: { name: singleLine(data.name), address: data.email },
    subject: singleLine(`Website enquiry: ${data.intent} — ${data.name}`),
    text,
    html,
  });
}
