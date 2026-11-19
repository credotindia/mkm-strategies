import { z } from "zod";
import { enquiryIntents, enquirySectors } from "@/lib/enquiry-options";

export const enquirySchema = z.object({
  intent: z.enum(enquiryIntents, { error: "Please choose what you're looking to do." }),
  sector: z.union([z.enum(enquirySectors), z.literal("")]).optional(),
  name: z.string().trim().min(2, { error: "Please enter your name." }).max(120),
  company: z.string().trim().max(160).optional(),
  email: z.string().trim().max(254).pipe(z.email({ error: "Please enter a valid email address." })),
  phone: z.string().trim().max(40).optional(),
  message: z
    .string()
    .trim()
    .min(10, { error: "Please add a little more detail (at least 10 characters)." })
    .max(5000),
  opportunity: z.string().trim().max(160).optional(),
  website: z.string().optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
