import { notFound } from "next/navigation";
import { mainNav } from "@/config/navigation";

export function SectionIntro({ href }: { href: string }) {
  const item = mainNav.find((entry) => entry.href === href);
  if (!item) notFound();

  return (
    <section className="page-x py-28">
      <h1 className="text-navy">{item.label}</h1>
      <p className="max-w-xl text-lg">{item.intro}</p>
    </section>
  );
}
