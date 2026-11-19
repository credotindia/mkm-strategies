import { ArrowLink } from "@/components/arrow-link";
import { SectionHeading } from "@/components/section-heading";
import { positioning } from "@/content/company";

export function WhoWeAre() {
  return (
    <section aria-labelledby="who-we-are-title" className="bg-navy text-white">
      <div className="page-x">
        <div className="py-20 md:py-25 lg:grid lg:grid-cols-[5fr_1fr_4fr] lg:py-30">
          <SectionHeading id="who-we-are-title" eyebrow="Who We Are" title={positioning.heading} />
          <div className="mt-3.25 md:mt-4.25 lg:col-start-3 lg:mt-0">
            <div className="max-w-xl space-y-[1em] text-base text-white/75 md:text-lg">
              {positioning.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6.25 flex lg:mt-7.5">
              <ArrowLink href="/about" variant="light">
                Know More
              </ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
