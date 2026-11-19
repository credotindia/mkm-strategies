import type { Metadata } from "next";
import { SectionIntro } from "@/components/section-intro";

export const metadata: Metadata = { title: "Who We Help" };

export default function Page() {
  return <SectionIntro href="/who-we-help" />;
}
