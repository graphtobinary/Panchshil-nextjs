"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { ClientItem } from "@/app/clients/clients.data";

type ClientsListingProps = {
  clients: ClientItem[];
  itemsPerPage?: number;
};

export default function ClientsListing({
  clients,
  itemsPerPage = 24,
}: ClientsListingProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(clients.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedClients = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    return clients.slice(startIndex, startIndex + itemsPerPage);
  }, [safeCurrentPage, itemsPerPage, clients]);

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0 md:gap-0">
          {paginatedClients.map((client) => (
            <article
              key={client.id}
              className="flex aspect-6/3 md:aspect-5/3 items-center justify-center bg-white px-6"
            >
              <div className="relative w-full h-full">
                <Image
                  src={client.imageSrc}
                  alt={client.imageAlt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-5">
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
