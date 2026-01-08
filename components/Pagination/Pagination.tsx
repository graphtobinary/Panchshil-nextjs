"use client";

import Link from "next/link";
import { useThemeStore } from "@/store/themeStore";
import { isAllowedPageForTheme } from "@/utils/utils";
import { useParams } from "next/navigation";
import ArrowLeftIcon from "@/assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/svgs/ArrowRightIcon";
import { PER_PAGE_LIMIT } from "@/api/constants";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  baseUrl: string;
}

export function Pagination({
  currentPage,
  totalItems,
  baseUrl,
}: PaginationProps) {
  const { theme } = useThemeStore();
  const params = useParams();
  const isAllowedPage = isAllowedPageForTheme(
    params as { [key: string]: string }
  );
  const isDarkMode = isAllowedPage ? theme === "night" : false;

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / PER_PAGE_LIMIT);

  // Don't show pagination if there's only one page or no items
  if (totalPages <= 1 || totalItems === 0) {
    return null;
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // Show max 5 page numbers

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      {/* Previous Button */}
      {prevPage ? (
        <Link
          href={`${baseUrl}/${prevPage}`}
          className={`flex items-center justify-center w-10 h-10 border transition-colors ${
            isDarkMode
              ? "border-white text-white hover:bg-white hover:text-black"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
          aria-label="Previous page"
        >
          <ArrowLeftIcon
            fill={isDarkMode ? "#FFFFFF" : "#000000"}
            width={16}
            height={16}
          />
        </Link>
      ) : (
        <div
          className={`flex items-center justify-center w-10 h-10 border opacity-50 cursor-not-allowed ${
            isDarkMode
              ? "border-gray-600 text-gray-600"
              : "border-gray-300 text-gray-300"
          }`}
          aria-label="Previous page (disabled)"
        >
          <ArrowLeftIcon
            fill={isDarkMode ? "#666666" : "#CCCCCC"}
            width={16}
            height={16}
          />
        </div>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className={`px-2 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              ...
            </span>
          );
        }

        const pageNum = page as number;
        const isActive = pageNum === currentPage;

        return (
          <Link
            key={pageNum}
            href={`${baseUrl}/${pageNum}`}
            className={`flex items-center justify-center w-10 h-10 border transition-colors ${
              isActive
                ? isDarkMode
                  ? "bg-white text-black border-white"
                  : "bg-gold-beige text-white border-gold-beige"
                : isDarkMode
                  ? "border-white text-white hover:bg-white hover:text-black"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
            aria-label={`Page ${pageNum}`}
            aria-current={isActive ? "page" : undefined}
          >
            {pageNum}
          </Link>
        );
      })}

      {/* Next Button */}
      {nextPage ? (
        <Link
          href={`${baseUrl}/${nextPage}`}
          className={`flex items-center justify-center w-10 h-10 border transition-colors ${
            isDarkMode
              ? "border-white text-white hover:bg-white hover:text-black"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
          aria-label="Next page"
        >
          <ArrowRightIcon
            fill={isDarkMode ? "#FFFFFF" : "#000000"}
            width={16}
            height={16}
          />
        </Link>
      ) : (
        <div
          className={`flex items-center justify-center w-10 h-10 border opacity-50 cursor-not-allowed ${
            isDarkMode
              ? "border-gray-600 text-gray-600"
              : "border-gray-300 text-gray-300"
          }`}
          aria-label="Next page (disabled)"
        >
          <ArrowRightIcon
            fill={isDarkMode ? "#666666" : "#CCCCCC"}
            width={16}
            height={16}
          />
        </div>
      )}
    </div>
  );
}
