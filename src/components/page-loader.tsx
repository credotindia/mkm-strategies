import { MARK } from "@/components/brand/logo-paths";
import "./page-loader.css";

export function PageLoader() {
  return (
    <div aria-hidden="true" className="page-loader bg-navy text-white">
      {MARK.paths.map((d) => (
        <div key={d} className="page-loader-glyph">
          <svg viewBox={`0 0 ${MARK.width} ${MARK.height}`} fill="currentColor" className="page-loader-mark">
            <path d={d} />
          </svg>
        </div>
      ))}
    </div>
  );
}
