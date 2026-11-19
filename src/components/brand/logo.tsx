import { LOCKUP, MARK } from "./logo-paths";

type LogoProps = {
  variant?: "lockup" | "mark";
  className?: string;
  title?: string;
};

export function Logo({ variant = "lockup", className, title = "MKM Strategies" }: LogoProps) {
  const art = variant === "mark" ? MARK : LOCKUP;
  return (
    <svg
      viewBox={`0 0 ${art.width} ${art.height}`}
      fill="currentColor"
      role="img"
      aria-label={title}
      className={className}
    >
      {art.paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
