"use client";

import { useState, useMemo } from "react";
import { AccordionItem } from "./AccordionItem";
import { AccordionProps } from "@/interfaces";

export function Accordion({
  propertyCategories,
  defaultOpen = 1,
}: AccordionProps) {
  // Transform propertyCategories prop data to match AccordionItem format
  const transformedData = useMemo(() => {
    return propertyCategories.map((item, index) => {
      const stats: Array<{ label: string }> = [];

      // Add developed stat if available
      if (item.property_category_info?.property_category_developed) {
        stats.push({
          label: item.property_category_info.property_category_developed,
        });
      }

      // Add under development stat if available
      if (item.property_category_info?.property_category_under_development) {
        stats.push({
          label:
            item.property_category_info.property_category_under_development,
        });
      }

      return {
        id: index + 1,
        title: item.property_category_title,
        description: item.property_category_description,
        image: item.property_category_image,
        stats: stats.length > 0 ? stats : undefined,
        link: item.property_category_link,
      };
    });
  }, [propertyCategories]);

  const [openIndex, setOpenIndex] = useState(defaultOpen);

  const handleToggle = (index: number) => {
    setOpenIndex(index);
  };

  return (
    <section className={`w-full transition-colors `}>
      <div className="max-w-[1920px] mx-auto">
        {transformedData.map((item) => (
          <AccordionItem
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
            stats={item.stats}
            link={item.link}
            isOpen={openIndex === item.id}
            onToggle={() => handleToggle(item.id)}
          />
        ))}
      </div>
    </section>
  );
}
