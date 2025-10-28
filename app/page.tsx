import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WelcomeSection } from "@/components/WelcomeSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <WelcomeSection />
    </main>
  );
}
