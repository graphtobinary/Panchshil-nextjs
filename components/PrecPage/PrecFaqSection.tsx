"use client";

import { useState } from "react";
import { PrecPageData } from "@/app/prec/prec-page.data";

type PrecFaqSectionProps = {
  content: PrecPageData["faqs"];
};

export default function PrecFaqSection({ content }: PrecFaqSectionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(1);

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-lg font-medium tracking-[0.2em] text-gold-beige">
          {content.kicker}
        </p>
        <h2 className="mt-2 text-center text-2xl md:text-[28px] font-display-semi text-black">
          {content.heading || "FREQUENTLY ASKED QUESTIONS"}
        </h2>

        <div className="mt-10 md:mt-14 border-t border-black/20">
          {content.items.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={faq.question} className="border-b border-black/20">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                  className="w-full py-4 md:py-5 grid grid-cols-[44px_1fr_24px] md:grid-cols-[64px_1fr_32px] items-start gap-3 md:gap-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display-semi text-2xl md:text-[36px] leading-none text-black/90">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-[2px] font-display-semi text-2xl md:text-[28px] leading-[1.15] text-black">
                    {faq.question}
                  </span>
                  <span className="pt-1 text-2xl md:text-3xl leading-none text-black/90 text-center">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen ? (
                  <div className="pb-4 md:pb-5 pl-[47px] md:pl-[70px] pr-10">
                    <p className="text-lg md:text-lg leading-relaxed text-black-chocolate">
                      {faq.answer}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
