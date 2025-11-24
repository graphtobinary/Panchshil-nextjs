"use client";

import { updateSubscriberFormDetailsAPI } from "@/api/CMS.api";
import { ContactDetailsProps } from "@/interfaces";
import Image from "next/image";
import { useState } from "react";

export function Footer({
  contactDetails,
}: {
  contactDetails: ContactDetailsProps;
}) {
  const verticals: string[] = [
    "Office Parks",
    "Hospitality",
    "Data Centres",
    "Residential",
    "Retail & F&B",
  ];
  const countries: string[] = ["Dubai", "Maldives", "Sri Lanka"];
  const quickLinks: string[] = [
    "About Us",
    "Services",
    "Testimonials",
    "Media",
    "Blogs",
  ];
  const usefulLinks: string[] = [
    "Panchshil Privilege",
    "Meet The City",
    "PREC",
    "Clients",
    "Awards",
  ];
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
    <footer className="w-full bg-[#FFFAF7] text-black-chocolate">
      {/* Row 1: Offices & Sales */}
      <div className="max-w-[1200px] mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {contactDetails.map((contact) => (
          <div key={contact.contact_title}>
            <div className="text-sm font-display-semi tracking-[0.2em] text-black mb-4">
              {contact.contact_title}
            </div>
            <div
              className="space-y-2 text-sm"
              dangerouslySetInnerHTML={{ __html: contact.contact_details }}
            />
            {contact.contact_number && (
              <div className="mt-2 flex items-center gap-2 text-sm">
                <Image
                  src="/assets/images/call-icon.png"
                  alt="Phone"
                  width={18}
                  height={18}
                />
                <span>{contact.contact_number}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Row 2: Menus & Newsletter */}
      <div className="bg-[#F9F0E9]">
        <div className="px-4 md:px-12 py-12 grid grid-cols-1 md:grid-cols-[0.8fr_0.8fr_0.8fr_1fr_2fr] gap-10">
          {/* Verticals */}
          <div>
            <div className="text-sm font-display-semi tracking-[0.2em] text-black mb-4">
              VERTICALS
            </div>
            <ul className="space-y-3 text-sm">
              {verticals.map((v) => (
                <li key={v}>
                  <a className="hover:text-gold-beige" href="">
                    {v}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Countries */}
          <div>
            <div className="text-sm font-display-semi tracking-[0.2em] text-black mb-4">
              COUNTRIES
            </div>
            <ul className="space-y-3 text-sm">
              {countries.map((c) => (
                <li key={c}>
                  <a className="hover:text-gold-beige" href="">
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-sm font-display-semi tracking-[0.2em] text-black mb-4">
              QUICK LINKS
            </div>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((q) => (
                <li key={q}>
                  <a className="hover:text-gold-beige" href="">
                    {q}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <div className="text-sm font-display-semi tracking-[0.2em] text-black mb-4">
              USEFUL LINKS
            </div>
            <ul className="space-y-3 text-sm">
              {usefulLinks.map((u) => (
                <li key={u}>
                  <a className="hover:text-gold-beige" href="">
                    {u}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <div className="text-sm font-display-semi tracking-[0.2em] text-black mb-4">
              STAY IN THE KNOW
            </div>
            <form className="space-y-1" onSubmit={handleSubmit}>
              <div className="flex items-center gap-3  pb-2">
                <input
                  type="email"
                  name="subscriber_email_id"
                  placeholder="Email Address"
                  required
                  className="bg-transparent outline-none text-sm flex-1 placeholder-black/50 border-b border-gold-beige"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-sm text-gold-beige underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
              {submitMessage && (
                <p
                  className={`text-[11px] ${
                    submitMessage.includes("Thank you")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {submitMessage}
                </p>
              )}
              <p className="text-[11px] text-black-chocolate/70 leading-relaxed tracking-wider">
                By signing up I want to hear about new updates and masterpieces
                and agree with the{" "}
                <a className="underline" href="/privacy-policy">
                  data protection policy
                </a>{" "}
                of panchshil
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Row 3: Copyright */}
      <div className="bg-[#35393B] text-white">
        <div className=" mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <div className="text-[12px] font-display-semi">
            PANCHSHIL &copy; 2025
          </div>
          <div className="hidden md:flex items-center gap-6 text-[12px] opacity-90">
            <a className="hover:text-gold-beige" href="">
              {" "}
              Term Of Use
            </a>
            <a className="hover:text-gold-beige" href="">
              Privacy
            </a>
            <a className="hover:text-gold-beige" href="">
              Disclaimer
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src="/assets/images/social-icons.png"
              alt="social"
              width={140}
              height={24}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
