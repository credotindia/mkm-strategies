import { LoopVideo } from "@/components/loop-video";
import { SectionHeading } from "@/components/section-heading";
import { whyMkm } from "@/content/company";
import "./why-mkm.css";

export function WhyMkm() {
  return (
    <section aria-labelledby="why-mkm-title" className="why-mkm why-mkm-dark">
      <div className="page-x">
        <div className="why-mkm-frame">
          <SectionHeading
            id="why-mkm-title"
            eyebrow={whyMkm.eyebrow}
            title={whyMkm.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            center
          />
          <div className="why-mkm-body">
            <div className="why-mkm-media" aria-hidden="true">
              <LoopVideo
                src="/videos/mkm-uae-flag.webm"
                poster="/images/mkm-uae-flag-poster.webp"
                className="absolute inset-0 size-full object-cover object-left"
              />
            </div>
            <ul className="why-mkm-items">
              {whyMkm.items.map((item) => (
                <li key={item.title} className="why-mkm-item">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
            <div className="why-mkm-lines" aria-hidden="true">
              {Array.from({ length: 8 }, (_, index) => (
                <span key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
