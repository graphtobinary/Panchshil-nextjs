"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { AwardItem } from "@/app/awards/awards.data";

type AwardsListingProps = {
  awards: AwardItem[];
  itemsPerPage?: number;
};

export default function AwardsListing({
  awards,
  itemsPerPage = 6,
}: AwardsListingProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(awards.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedAwards = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    return awards.slice(startIndex, startIndex + itemsPerPage);
  }, [safeCurrentPage, itemsPerPage, awards]);

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {paginatedAwards.map((award) => (
            <article key={award.id} className="flex flex-col text-center">
              <div className="flex aspect-4/3 items-center justify-center  bg-white p-6">
                <div className="relative w-full h-full">
                  <Image
                    src={award.imageSrc}
                    alt={award.imageAlt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>
              <h3 className="mt-6 text-xl md:text-[22px] leading-tight font-display-semi text-[#1f1f1f]">
                {award.title}
              </h3>
              <p className="mt-3 text-[15px] md:text-[16px] leading-relaxed text-[#4a4a4a]">
                {award.description}
              </p>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12 md:mt-16">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={safeCurrentPage === 1}
              className="h-10 w-10 flex items-center justify-center border border-[#c8c8c8] text-[#7d7d7d] disabled:opacity-40 disabled:cursor-not-allowed transition-colors hover:bg-[#f7f4ee]"
              aria-label="Previous page"
            >
              ←
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-10 min-w-10 flex items-center justify-center border px-3 text-[14px] transition-colors ${
                    page === safeCurrentPage
                      ? "bg-[#ad9d7d] border-[#ad9d7d] text-white"
                      : "bg-white border-[#c8c8c8] text-[#4f4f4f] hover:bg-[#f7f4ee]"
                  }`}
                  aria-current={page === safeCurrentPage ? "page" : undefined}
                >
                  {page}
                </button>
              )
            )}

            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={safeCurrentPage === totalPages}
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
