import { Faq } from "@/components/faq";
import { GlobalReach } from "@/components/global-reach";
import { HomeHero } from "@/components/home-hero";
import { WhoWeAre } from "@/components/who-we-are";
import { WhyMkm } from "@/components/why-mkm";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <WhoWeAre />
      <WhyMkm />
      <GlobalReach />
      <Faq />
    </>
  );
}
