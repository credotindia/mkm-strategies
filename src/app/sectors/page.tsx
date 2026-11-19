import type { Metadata } from "next";
import { SectionIntro } from "@/components/section-intro";

export const metadata: Metadata = { title: "Sectors" };

export default function Page() {
  return <SectionIntro href="/sectors" />;
}
