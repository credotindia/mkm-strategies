import type { Metadata } from "next";
import { SectionIntro } from "@/components/section-intro";

export const metadata: Metadata = { title: "What We Do" };

export default function Page() {
  return <SectionIntro href="/what-we-do" />;
}
