import Image from "next/image";
import type { CSSProperties } from "react";
import { globalReach } from "@/content/company";
import "./global-reach.css";

const logos = [
  [109, 18.2],
  [158, 33],
  [134.9, 31],
  [183, 33],
  [130, 43],
  [117.5, 25],
  [113, 29],
  [125.8, 31.8],
  [135.4, 17],
  [109.4, 39.6],
].map(([width, height], index) => ({
  src: `/logos/demo/demo-${String(index + 1).padStart(2, "0")}.svg`,
  width,
  height,
}));

function Lines({ lines }: { lines: readonly string[] }) {
  return lines.map((line, index) => (
    <span key={line}>
      {index > 0 && <br />}
      {line}
    </span>
  ));
}

export function GlobalReach() {
  return (
    <section aria-labelledby="global-reach-title" className="global-reach">
      <div className="global-reach-layer global-reach-bg" aria-hidden="true">
        <Image src="/images/global-reach-bg.webp" alt="" width={4032} height={2884} sizes="100vw" quality={90} />
      </div>
      <div className="global-reach-layer global-reach-fg" aria-hidden="true">
        <Image src="/images/global-reach-fg.webp" alt="" width={4032} height={2884} sizes="100vw" quality={90} />
      </div>
      <div className="global-reach-content page-x">
        <div className="global-reach-grid">
          <h2 id="global-reach-title" className="global-reach-title">
            <span className="global-reach-lead">
              <Lines lines={globalReach.lead} />
            </span>{" "}
            <span className="global-reach-follow">
              <Lines lines={globalReach.follow} />
            </span>
          </h2>
          <div className="global-reach-text">
            {globalReach.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="global-reach-logos" aria-hidden="true">
            {logos.map((logo) => (
              <li key={logo.src}>
                <Image
                  src={logo.src}
                  alt=""
                  width={logo.width}
                  height={logo.height}
                  style={{ "--ratio": logo.width / logo.height } as CSSProperties}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
