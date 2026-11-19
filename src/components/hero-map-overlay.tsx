import { MKM_OFFICES, UAE_MAP } from "@/content/uae-map";
import "./hero-map-overlay.css";

const CALLOUTS = [
  { ...MKM_OFFICES[0], labelX: 61, labelY: 33 },
  { ...MKM_OFFICES[1], labelX: 67, labelY: 11 },
];

function Star({ side }: { side: "left" | "right" }) {
  return (
    <svg viewBox="-10 -10 20 20" aria-hidden="true" className={`home-hero-star home-hero-star-${side}`}>
      <path d="M0-10V10M-10 0H10M-6-6L6 6M6-6L-6 6" stroke="currentColor" />
    </svg>
  );
}

export function HeroMapOverlay() {
  return (
    <>
      <svg className="home-hero-grid" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <rect x="0" y="0" width="100" height="100" />
        <path d="M25 0V100M50 0V100M75 0V100M0 50H100M0 0L100 100M100 0L0 100" />
      </svg>
      <Star side="left" />
      <Star side="right" />

      <div className="home-hero-map" aria-hidden="true">
        <svg viewBox={`0 0 ${UAE_MAP.width} ${UAE_MAP.height}`} className="size-full overflow-visible">
          <g className="home-hero-borders">
            {UAE_MAP.emirates.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          {CALLOUTS.map((office) => (
            <g key={office.city}>
              <line
                x1={office.x}
                y1={office.y}
                x2={office.labelX * 10}
                y2={(office.labelY / 100) * UAE_MAP.height}
                className="home-hero-leader"
              />
              <circle cx={office.x} cy={office.y} r="6" className="home-hero-pulse" />
              <circle cx={office.x} cy={office.y} r="6" className="home-hero-dot" />
            </g>
          ))}
        </svg>
        {CALLOUTS.map((office) => (
          <p
            key={office.city}
            className="home-hero-label"
            style={{ left: `${office.labelX}%`, top: `${office.labelY}%` }}
          >
            <span className="eyebrow block text-navy">{office.city}</span>
            <span className="block text-xs text-navy/60">{office.label}</span>
          </p>
        ))}
      </div>
    </>
  );
}
