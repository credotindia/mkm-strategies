import type { ReactNode } from "react";
import "./section-heading.css";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  center?: boolean;
};

export function SectionHeading({ id, eyebrow, title, intro, center = false }: SectionHeadingProps) {
  return (
    <div className={center ? "section-heading is-center" : "section-heading"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {intro && <p className="section-heading-intro">{intro}</p>}
    </div>
  );
}
