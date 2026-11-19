import { z } from "zod";
import { site } from "@/config/site";
import type { EnquiryResponse } from "@/lib/enquiry-options";
import { enquirySchema } from "@/lib/enquiry-schema";
import { sendEnquiry } from "@/lib/mailer";

const MAX_BODY_BYTES = 20_000;

const reply = (body: EnquiryResponse, status = 200) => Response.json(body, { status });

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return reply({ ok: false, error: "Request too large." }, 413);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return reply({ ok: false, error: "Invalid request." }, 400);
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return reply(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors: z.flattenError(parsed.error).fieldErrors },
      422,
    );
  }

  const isBot = Boolean(parsed.data.website);
  if (isBot) return reply({ ok: true });

  try {
    await sendEnquiry(parsed.data);
  } catch (error) {
    console.error("[contact] SMTP send failed:", error);
    return reply({ ok: false, error: `We couldn't send your enquiry. Please email ${site.contact.email}.` }, 502);
  }

  return reply({ ok: true });
}
