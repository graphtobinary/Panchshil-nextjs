"use client";

import { useMemo, useState } from "react";
import { ResidentVoiceTestimonialCard } from "@/components/ResidentVoiceTestimonialCard";
import type { TestimonialListItem } from "@/app/testimonials/testimonials-page.data";

type TestimonialTabId = "all" | "residential" | "office";

const TABS: { id: TestimonialTabId; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "residential", label: "RESIDENTIAL" },
  { id: "office", label: "OFFICE PARKS" },
];

type TestimonialsSectionProps = {
  items: TestimonialListItem[];
  itemsPerPage?: number;
};

export default function TestimonialsSection({
  items,
  itemsPerPage = 8,
}: TestimonialsSectionProps) {
  const [activeTab, setActiveTab] = useState<TestimonialTabId>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    if (activeTab === "all") return items;
    if (activeTab === "residential") {
      return items.filter((t) => t.category === "residential");
    }
    return items.filter((t) => t.category === "office");
  }, [items, activeTab]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, safePage, itemsPerPage]);

  const handleTab = (id: TestimonialTabId) => {
    setActiveTab(id);
    setCurrentPage(1);
  };

  return (
    <section className="w-full bg-white py-14 md:py-20">
      <div className="mx-auto max-w-[1540px] px-6 md:px-10">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTab(tab.id)}
                className={`relative pb-3 text-sm md:text-base font-medium tracking-[0.12em] uppercase transition-colors ${
                  isActive
                    ? "text-gold-beige after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gold-beige"
                    : "text-gold-beige/80 hover:text-gold-beige"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {pageItems.map((item) => (
            <ResidentVoiceTestimonialCard
              key={item.id}
              quote={item.quote}
              details={item.details}
              author={item.author}
              role={item.role}
              avatarSrc={item.avatarSrc}
              avatarAlt={item.avatarAlt}
              className="w-full"
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-12 md:mt-16 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="h-10 w-10 flex items-center justify-center border border-[#c8c8c8] text-[#7d7d7d] disabled:opacity-40 disabled:cursor-not-allowed transition-colors hover:bg-[#f7f4ee]"
              aria-label="Previous page"
            >
              ←
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`h-10 min-w-10 flex items-center justify-center border px-3 text-[14px] transition-colors ${
                  page === safePage
                    ? "bg-[#ad9d7d] border-[#ad9d7d] text-white"
                    : "bg-white border-[#c8c8c8] text-[#ad9d7d] hover:bg-[#f7f4ee]"
                }`}
                aria-current={page === safePage ? "page" : undefined}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="h-10 w-10 flex items-center justify-center border border-[#c8c8c8] text-[#7d7d7d] disabled:opacity-40 disabled:cursor-not-allowed transition-colors hover:bg-[#f7f4ee]"
              aria-label="Next page"
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
