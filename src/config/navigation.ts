export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = { heading: string; links: NavLink[] };
export type NavItem = {
  label: string;
  href: string;
  intro: string;
  groups: NavGroup[];
  footerLink: NavLink;
};

export const primaryCta: NavLink = { label: "Get In Touch", href: "/contact" };

export const mainNav: NavItem[] = [
  {
    label: "Who We Help",
    href: "/who-we-help",
    intro: "Different needs. A common partner.",
    groups: [
      {
        heading: "By client",
        links: [
          { label: "Entrepreneurs", href: "/who-we-help/entrepreneurs", description: "For starting, evaluating or growing a business" },
          { label: "Business Owners & Sellers", href: "/who-we-help/business-owners", description: "For preparing, positioning and selling a business" },
          { label: "Buyers", href: "/who-we-help/buyers", description: "For sourcing and acquiring businesses or assets" },
          { label: "Investors", href: "/who-we-help/investors", description: "For evaluating and advancing commercial opportunities" },
        ],
      },
    ],
    footerLink: { label: "View all Who We Help", href: "/who-we-help" },
  },
  {
    label: "What We Do",
    href: "/what-we-do",
    intro: "From insight to execution.",
    groups: [
      {
        heading: "Make informed decisions",
        links: [
          { label: "Strategic Advisory", href: "/what-we-do/strategic-advisory", description: "Clarify direction, decisions and commercial priorities" },
          { label: "Market Intelligence", href: "/what-we-do/market-intelligence", description: "Understand markets, feasibility and commercial conditions" },
          { label: "Buy-Side Advisory", href: "/what-we-do/buy-side-advisory", description: "Source, evaluate and facilitate business or asset acquisitions" },
          { label: "Sell-Side Advisory", href: "/what-we-do/sell-side-advisory", description: "Prepare, position and facilitate a business sale" },
        ],
      },
      {
        heading: "Move opportunities forward",
        links: [
          { label: "Investment Opportunities & Facilitation", href: "/what-we-do/investment-facilitation", description: "Identify and advance investment opportunities" },
          { label: "Strategic Connections", href: "/what-we-do/strategic-connections", description: "Access relevant stakeholders, expertise and relationships" },
          { label: "Project Facilitation & Execution", href: "/what-we-do/project-facilitation", description: "Coordinate stakeholders and move projects into execution" },
        ],
      },
    ],
    footerLink: { label: "Explore all capabilities", href: "/what-we-do" },
  },
  {
    label: "Sectors",
    href: "/sectors",
    intro: "Deep expertise. Real-world insight.",
    groups: [
      {
        heading: "Sectors",
        links: [
          { label: "Education", href: "/sectors/education" },
          { label: "Real Estate & Infrastructure", href: "/sectors/real-estate-infrastructure" },
          { label: "Retail & Commercial", href: "/sectors/retail-commercial" },
          { label: "Technology & AI", href: "/sectors/technology-ai" },
        ],
      },
    ],
    footerLink: { label: "Explore all sectors", href: "/sectors" },
  },
  {
    label: "Opportunities",
    href: "/opportunities",
    intro: "Access the right opportunities.",
    groups: [
      {
        heading: "Opportunities",
        links: [
          { label: "Explore Opportunities", href: "/opportunities" },
          { label: "Businesses for Sale", href: "/opportunities#businesses-for-sale" },
          { label: "Investment Opportunities", href: "/opportunities#investment" },
          { label: "Strategic / Project Opportunities", href: "/opportunities#projects" },
        ],
      },
    ],
    footerLink: { label: "Discuss an Opportunity", href: "/contact" },
  },
  {
    label: "Insights",
    href: "/insights",
    intro: "Ideas, analysis and perspectives.",
    groups: [
      {
        heading: "Insights",
        links: [
          { label: "Market Insights", href: "/insights#market-insights" },
          { label: "Guides & Reports", href: "/insights#guides-reports" },
          { label: "Articles & Perspectives", href: "/insights#articles" },
        ],
      },
    ],
    footerLink: { label: "View all insights", href: "/insights" },
  },
  {
    label: "About",
    href: "/about",
    intro: "People. Network. Impact.",
    groups: [
      {
        heading: "About MKM",
        links: [
          { label: "Who We Are", href: "/about" },
          { label: "Leadership", href: "/about#leadership" },
          { label: "Our Network", href: "/about#network" },
          { label: "Track Record / Success Stories", href: "/success-stories" },
        ],
      },
    ],
    footerLink: { label: "About MKM", href: "/about" },
  },
];

export const exploreLinks: NavLink[] = [
  { label: "Sectors", href: "/sectors" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
