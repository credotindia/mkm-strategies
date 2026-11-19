import type { Metadata } from "next";
import { PageLoader } from "@/components/page-loader";
import { PageTransition } from "@/components/page-transition";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/config/site";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Strategic Advisory & Execution, UAE`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_AE",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="flex min-h-dvh flex-col">
        <PageLoader />
        <PageTransition>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </PageTransition>
      </body>
    </html>
  );
}
