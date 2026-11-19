export const enquiryIntents = [
  "Start or grow a business",
  "Sell a business",
  "Buy a business or asset",
  "Explore an opportunity",
  "Develop or execute a project",
  "Understand a market",
  "Other / not sure",
] as const;

export const enquirySectors = [
  "Education",
  "Real Estate & Infrastructure",
  "Retail & Commercial",
  "Technology & AI",
  "Trading & Lifestyle",
  "Other",
] as const;

export type EnquiryResponse =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<string, string[]>> };
