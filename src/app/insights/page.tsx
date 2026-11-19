import type { Metadata } from "next";
import { SectionIntro } from "@/components/section-intro";

export const metadata: Metadata = { title: "Insights" };

export default function Page() {
  return <SectionIntro href="/insights" />;
}
