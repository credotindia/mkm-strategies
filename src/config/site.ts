export const site = {
  name: "MKM Strategies",
  legalName: "MKM Strategies FZE",
  tagline: "Turning complexity into sovereign value.",
  description:
    "Strategic advisory, capital structuring and ecosystem transformation for entrepreneurs, business owners, buyers and investors across the GCC and key global markets.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mkmstrategies.ae",
  pillars: ["Strategic Advisory", "Capital Structuring", "Ecosystem Transformation"],
  contact: {
    email: "contact@mkmstrategies.ae",
    ceoEmail: "ceo@mkmstrategies.ae",
    phone: { display: "+971 56 104 4445", href: "tel:+971561044445" },
    whatsapp: "https://wa.me/971561044445",
  },
  offices: [
    {
      label: "Dubai Headquarters",
      lines: ["Suite 903, White Crown Tower, Sheikh Zayed Road", "Trade Centre First, Dubai, United Arab Emirates"],
    },
    {
      label: "Northern Emirates Corporate Office",
      lines: ["BC Building, Office 1308512, Ajman Free Zone", "United Arab Emirates"],
    },
  ],
} as const;
