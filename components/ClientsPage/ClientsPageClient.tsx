"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CareerHero } from "@/components/CareerHero";
import { ClientsListing } from "@/components/ClientsListing";
import { ClientsPageData } from "@/app/clients/clients.data";

type ClientsPageClientProps = {
  data: ClientsPageData;
};

export default function ClientsPageClient({ data }: ClientsPageClientProps) {
  return (
    <main className="min-h-screen bg-[#FFFAF7]">
      <Header />
      <section className="min-h-screen flex flex-col bg-white">
        <CareerHero hero={data.hero} />
      </section>
      <ClientsListing clients={data.clients} itemsPerPage={24} />
      <Footer />
    </main>
  );
}
