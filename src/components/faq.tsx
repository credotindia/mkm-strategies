import { SectionHeading } from "@/components/section-heading";
import { faq } from "@/content/faq";
import "./faq.css";

const half = Math.ceil(faq.items.length / 2);
const columns = [faq.items.slice(0, half), faq.items.slice(half)];

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="faq page-x">
      <SectionHeading id="faq-title" eyebrow={faq.eyebrow} title={faq.heading} intro={faq.intro} />
      <div className="faq-grid">
        {columns.map((column) => (
          <div key={column[0].question} className="faq-column">
            {column.map((item) => (
              <details key={item.question} name="faq" className="faq-item">
                <summary>
                  <span>{item.question}</span>
                  <span className="faq-toggle" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="m4 6 4 4 4-4" />
                    </svg>
                  </span>
                </summary>
                <p className="faq-answer">{item.answer}</p>
              </details>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
