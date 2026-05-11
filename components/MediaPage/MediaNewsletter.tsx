"use client";

import { useState } from "react";
import { updateSubscriberFormDetailsAPI } from "@/api/CMS.api";

export default function MediaNewsletter() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const subscriberEmailId = formData.get("subscriber_email_id") as string;

      if (!subscriberEmailId) {
        throw new Error("Email is required");
      }

      // Call the proxy route
      const response = (await updateSubscriberFormDetailsAPI(
        formData
      )) as Response;

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form");
      }

      setSubmitMessage("Thank you for subscribing!");
      // Reset form
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error updating subscriber form details:", error);
      setSubmitMessage(
        error instanceof Error ? error.message : "Failed to submit form"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-14 md:py-24 bg-[#FFFAF7]">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
        <div>
          <h2 className="text-2xl md:text-[32px] font-display-semi text-black tracking-wide">
            SUBSCRIBE TO OUR NEWSLETTER
          </h2>
          <p className="mt-4 text-sm md:text-base leading-relaxed text-black-chocolate/80 max-w-md">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et.
          </p>
        </div>

        <div>
          <form className="w-full relative" onSubmit={handleSubmit}>
            <div className="flex items-center pb-3 border-b border-[#B8A38B]">
              <input
                type="email"
                name="subscriber_email_id"
                placeholder="Email Address"
                required
                className="bg-transparent outline-none text-sm md:text-base flex-1 placeholder-black-chocolate/60 text-black-chocolate"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-[#B8A38B] text-sm font-medium disabled:opacity-50 transition-colors hover:text-black"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>

            {submitMessage && (
              <p
                className={`absolute mt-2 text-xs md:text-sm ${
                  submitMessage.includes("Thank you")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {submitMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
