"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { MeetTheCityEdition } from "@/app/meet-the-city/meet-the-city-page.data";

type MeetTheCityMagazineGridProps = {
  editions: MeetTheCityEdition[];
  itemsPerPage?: number;
};

export default function MeetTheCityMagazineGrid({
  editions,
  itemsPerPage = 6,
}: MeetTheCityMagazineGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(editions.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedEditions = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    return editions.slice(startIndex, startIndex + itemsPerPage);
  }, [safeCurrentPage, itemsPerPage, editions]);

  return (
    <section className="overflow-x-hidden bg-white py-10 md:py-14">
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8">
        <div className="grid min-w-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {paginatedEditions.map((edition) => (
            <article
              key={edition.id}
              className="flex min-w-0 w-full flex-col items-center"
            >
              <div className="flex min-h-0 w-full aspect-[4/3] items-center justify-center overflow-hidden bg-white">
                <div className="relative h-full w-full min-w-0">
                  <Image
                    src={edition.imageSrc}
                    alt={edition.imageAlt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>
              <h3 className=" w-full text-left pt-3 pl-5 wrap-break-word text-base md:text-[17px] font-normal font-display-semi leading-snug text-[#4a4a4a]">
                {edition.title}
              </h3>
            </article>
          ))}
        </div>

        {/* {totalPages > 1 && (
          <div className="mt-12 md:mt-16 flex items-center justify-center gap-3">
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
                      : "bg-white border-[#c8c8c8] text-[#ad9d7d] hover:bg-[#f7f4ee]"
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
        )} */}
      </div>
    </section>
  );
}
