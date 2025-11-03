import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WelcomeSection } from "@/components/WelcomeSection";
import { Accordion } from "@/components/Accordion";
import { Projects } from "@/components/Projects";
import { Signature } from "@/components/Signature";
import { Services } from "@/components/Services";
import { LatestNews } from "@/components/LatestNews";
import { Footer } from "@/components/Footer";
import { accordionItems } from "@/components/Accordion/accordionData";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFAF7]">
      <Header />
      <Hero />
      <WelcomeSection />
      <Accordion items={accordionItems} defaultOpen={1} />
      <Projects />
      <Signature />
      <Services />
      <LatestNews />
      <Footer />
    </main>
  );
}
