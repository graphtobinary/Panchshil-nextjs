import { useState, useCallback, useRef, useEffect } from "react";
import { PropertyProps } from "@/interfaces";
import API_CONSTANTS, { PER_PAGE_LIMIT } from "@/api/constants";

interface UsePropertiesPaginationProps {
  initialProperties: PropertyProps[];
  propertyCategoryUrlSlug: string;
  totalPropertyCount?: number;
  onLoadMore?: (properties: PropertyProps[]) => void;
}

interface UsePropertiesPaginationReturn {
  properties: PropertyProps[];
  isLoading: boolean;
  hasMore: boolean;
  error: string | null;
  loadNextPage: () => Promise<void>;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
}

export function usePropertiesPagination({
  initialProperties,
  propertyCategoryUrlSlug,
  totalPropertyCount,
  onLoadMore,
}: UsePropertiesPaginationProps): UsePropertiesPaginationReturn {
  const [properties, setProperties] = useState<PropertyProps[]>(
    initialProperties || []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);

  // Update properties when initialProperties change
  useEffect(() => {
    if (initialProperties && initialProperties.length > 0) {
      setProperties(initialProperties);
      setCurrentPage(1);
      // If totalPropertyCount is provided, check if we've loaded all properties
      if (totalPropertyCount !== undefined) {
        setHasMore(initialProperties.length < totalPropertyCount);
      } else {
        setHasMore(true);
      }
    }
  }, [initialProperties, totalPropertyCount]);

  const loadNextPage = useCallback(async () => {
    // Prevent duplicate requests
    if (isLoadingRef.current || !hasMore) {
      return;
    }

    // If totalPropertyCount is provided, check if we've already loaded all properties
    if (
      totalPropertyCount !== undefined &&
      properties.length >= totalPropertyCount
    ) {
      setHasMore(false);
      return;
    }

    isLoadingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const nextPage = currentPage + 1;
      const response = await fetch(
        `${API_CONSTANTS.PROPERTIES_BY_CATEGORY_API}?property_category_url_slug=${propertyCategoryUrlSlug}&page=${nextPage}`
      );

      if (!response.ok) {
        throw new Error(`Failed to load properties: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        const allPropertiesFromAPI = result.data as PropertyProps[];

        // If no properties or empty array, we've reached the end
        if (!allPropertiesFromAPI || allPropertiesFromAPI.length === 0) {
          setHasMore(false);
        } else if (allPropertiesFromAPI.length <= properties.length) {
          // API is returning paginated results (items from skip to skip+limit, not cumulative)
          // Use them directly - this could be a full page (5 items) or the last page (fewer items)
          const updatedProperties = [...properties, ...allPropertiesFromAPI];
          setProperties(updatedProperties);
          setCurrentPage(nextPage);

          if (onLoadMore) {
            onLoadMore(allPropertiesFromAPI);
          }

          // Check if we've reached the total count
          if (totalPropertyCount !== undefined) {
            const hasMoreProperties =
              updatedProperties.length < totalPropertyCount;
            setHasMore(hasMoreProperties);
          } else {
            // If no total count, continue if we got items (might be last page with fewer items)
            // Stop only if we got 0 items
            setHasMore(allPropertiesFromAPI.length > 0);
          }
        } else {
          // The API returns items from 0 to limit (all items up to that point)
          // We need to extract only the new items (items we don't already have)
          const currentCount = properties.length;
          const newItems = allPropertiesFromAPI.slice(currentCount);

          // If no new items, we've reached the end
          if (newItems.length === 0) {
            setHasMore(false);
          } else {
            // Append new items to existing ones
            const updatedProperties = [...properties, ...newItems];
            setProperties(updatedProperties);
            setCurrentPage(nextPage);

            // Call the callback if provided
            if (onLoadMore) {
              onLoadMore(newItems);
            }

            // Check if we've reached the total count or got fewer items than expected
            if (totalPropertyCount !== undefined) {
              // Use totalPropertyCount to determine if we've loaded all properties
              const hasMoreProperties =
                updatedProperties.length < totalPropertyCount;
              setHasMore(hasMoreProperties);
            } else {
              // Fallback: Check if we got fewer new items than PER_PAGE_LIMIT
              if (newItems.length < PER_PAGE_LIMIT) {
                setHasMore(false);
              }
            }
          }
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error loading next page:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load properties"
      );
      setHasMore(false);
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, [
    currentPage,
    hasMore,
    properties,
    propertyCategoryUrlSlug,
    totalPropertyCount,
    onLoadMore,
  ]);

  // Check if we need to load more properties immediately (if sentinel is already visible)
  useEffect(() => {
    if (!hasMore || isLoading || isLoadingRef.current) {
      return;
    }

    // If we have totalPropertyCount and haven't reached it, check if sentinel is visible
    if (
      totalPropertyCount !== undefined &&
      properties.length < totalPropertyCount
    ) {
      const sentinel = sentinelRef.current;
      if (sentinel) {
        // Check if sentinel is already in viewport
        const rect = sentinel.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight + 100; // 100px margin

        if (isVisible && !isLoadingRef.current) {
          loadNextPage();
        }
      }
    }
  }, [
    properties.length,
    hasMore,
    isLoading,
    totalPropertyCount,
    loadNextPage,
    currentPage,
  ]);

  // Intersection Observer to detect when sentinel is visible
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || isLoading) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (
          entry.isIntersecting &&
          hasMore &&
          !isLoading &&
          !isLoadingRef.current
        ) {
          loadNextPage();
        }
      },
      {
        root: null,
        rootMargin: "100px", // Start loading 100px before the sentinel is visible
        threshold: 0.1,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [
    hasMore,
    isLoading,
    loadNextPage,
    currentPage,
    properties.length,
    totalPropertyCount,
  ]);

  return {
    properties,
    isLoading,
    hasMore,
    error,
    loadNextPage,
    sentinelRef,
  };
}
