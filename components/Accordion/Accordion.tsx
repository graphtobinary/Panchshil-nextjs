"use client";

import { useState } from "react";
import { AccordionItem } from "./AccordionItem";

interface AccordionData {
  id: number;
  title: string;
  description: string;
  image: string;
  stats?: Array<{ label: string }>;
}

interface AccordionProps {
  items: AccordionData[];
  defaultOpen?: number;
}

export function Accordion({ items, defaultOpen = 3 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);

  const handleToggle = (index: number) => {
    setOpenIndex(index);
  };

  return (
    <section className="w-full bg-[#FFFAF7]">
      <div className="max-w-[1920px] mx-auto">
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
            stats={item.stats}
            isOpen={openIndex === item.id}
            onToggle={() => handleToggle(item.id)}
          />
        ))}
      </div>
    </section>
  );
}
