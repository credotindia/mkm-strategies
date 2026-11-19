import Image from "next/image";
import { ArrowLink } from "@/components/arrow-link";
import { HomeHeroFrame } from "@/components/home-hero-frame";
import { primaryCta } from "@/config/navigation";
import { stats } from "@/content/company";
import "./home-hero.css";

export function HomeHero() {
  return (
    <section className="home-hero">
      <div className="home-hero-stage">
        <div className="home-hero-canvas">
          <HomeHeroFrame>
            <div className="home-hero-media">
              <Image src="/images/hero-difc.webp" alt="" fill priority sizes="100vw" className="object-cover" />
            </div>

            <div className="home-hero-copy">
              <p className="eyebrow text-navy/70">Strategic Advisory &amp; Execution</p>
              <h1 className="text-balance text-navy">Make the Right Move.</h1>
              <p className="max-w-md text-base text-ink/80 sm:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              </p>
              <div className="mt-6.25 flex flex-wrap gap-3 lg:mt-7.5">
                <ArrowLink href={primaryCta.href} variant="solid">
                  {primaryCta.label}
                </ArrowLink>
                <ArrowLink href="/what-we-do">Explore More</ArrowLink>
              </div>
            </div>
          </HomeHeroFrame>
        </div>

        <div className="home-hero-outro">
          <div className="page-x flex-1">
            <h2 className="max-w-3xl text-4xl text-white md:text-6xl">Turning complexity into sovereign value.</h2>
            <dl className="home-hero-stats grid grid-cols-2 gap-x-6 gap-y-8 xl:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="row-span-2 grid grid-rows-subgrid gap-y-0">
                  <dt className="eyebrow text-white/60">{stat.label}</dt>
                  <dd className="font-display text-white">
                    {"prefix" in stat ? `${stat.prefix} ` : ""}
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
