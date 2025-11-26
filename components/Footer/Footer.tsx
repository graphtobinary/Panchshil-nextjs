"use client";

import { updateSubscriberFormDetailsAPI } from "@/api/CMS.api";
import { ContactDetailsProps, NavigationMenuProps } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Footer({
  contactDetails,
  navigationMenu,
}: {
  contactDetails: ContactDetailsProps;
  navigationMenu: NavigationMenuProps[];
}) {
  const verticals: { title: string; link: string }[] = [
    { title: "Office Parks", link: "/office-parks" },
    { title: "Hospitality", link: "/hospitality" },
    { title: "Data Centres", link: "/data-centres" },
    { title: "Residential", link: "/residential" },
    { title: "Retail & F&B", link: "/retail-and-f&b" },
  ];
  const countries: { title: string; link: string }[] = [
    { title: "Dubai", link: "/dubai" },
    { title: "Maldives", link: "/maldives" },
    { title: "Sri Lanka", link: "/sri-lanka" },
  ];
  const quickLinks: { title: string; link: string }[] = [
    { title: "About Us", link: "https://www.panchshil.com/about" },
    { title: "Services", link: "https://www.panchshil.com/services" },
    { title: "Testimonials", link: "https://www.panchshil.com/testimonials" },
    { title: "Media", link: "https://www.panchshil.com/press" },
    { title: "Blogs", link: "https://www.panchshil.com/blog" },
  ];
  const usefulLinks: { title: string; link: string }[] = [
    {
      title: "Panchshil Privilege",
      link: "https://www.panchshilprivilege.com/",
    },
    { title: "Meet The City", link: "https://www.panchshil.com/meet-the-city" },
    { title: "PREC", link: "https://www.panchshil.com/prec" },
    { title: "Clients", link: "https://www.panchshil.com/clients" },
    {
      title: "Awards",
      link: "https://www.panchshil.com/awards-and-recognitions",
    },
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
                <Link href={`tel:${contact.contact_number}`}>
                  <span>{contact.contact_number}</span>
                </Link>
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
              {navigationMenu?.map((item, i) => {
                if (
                  item?.menuTitle === "About" ||
                  item?.menuTitle === "International Projects"
                )
                  return null;
                return (
                  <li key={item.menuTitle + i}>
                    <Link
                      className="hover:text-gold-beige"
                      href={item.menuURL || ""}
                    >
                      {item.menuTitle}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Countries */}
          <div>
            <div className="text-sm font-display-semi tracking-[0.2em] text-black mb-4">
              COUNTRIES
            </div>
            <ul className="space-y-3 text-sm">
              {navigationMenu[6]?.menu?.map((item, i) => (
                <li key={item.menuTitle + i}>
                  <Link
                    className="hover:text-gold-beige"
                    href={item.menuURL || ""}
                  >
                    {item.menuTitle}
                  </Link>
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
                <li key={q.title}>
                  <Link className="hover:text-gold-beige" href={q.link}>
                    {q.title}
                  </Link>
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
                <li key={u.title}>
                  <Link
                    className="hover:text-gold-beige"
                    href={u.link}
                    target={
                      u.title === "Panchshil Privilege" ? "_blank" : "_self"
                    }
                  >
                    {u.title}
                  </Link>
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
                <Link
                  className="underline"
                  href="https://www.panchshil.com/privacy-policy"
                  target="_blank"
                >
                  data protection policy
                </Link>{" "}
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
            PANCHSHIL &copy; {new Date().getFullYear()}
          </div>
          <div className="hidden md:flex items-center gap-6 text-[12px] opacity-90">
            <Link
              target="_blank"
              className="hover:text-gold-beige"
              href="https://www.panchshil.com/terms-and-conditions"
            >
              {" "}
              Term Of Use
            </Link>
            <Link
              target="_blank"
              className="hover:text-gold-beige"
              href="https://www.panchshil.com/privacy-policy"
            >
              Privacy
            </Link>
            <Link
              target="_blank"
              className="hover:text-gold-beige"
              href="https://www.panchshil.com/disclaimer"
            >
              Disclaimer
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="https://www.facebook.com/panchshilrealty/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Image
                src="/assets/images/facebook.svg"
                alt="Facebook"
                width={30}
                height={30}
              />
            </Link>
            <Link
              href="https://www.instagram.com/panchshilrealty/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Image
                src="/assets/images/instagram.svg"
                alt="Instagram"
                width={30}
                height={30}
              />
            </Link>
            <Link
              href="https://www.linkedin.com/company/panchshilrealty/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Image
                src="/assets/images/linked in.svg"
                alt="LinkedIn"
                width={30}
                height={30}
              />
            </Link>

            <Link
              href="https://www.youtube.com/user/panchshilrealtypune"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <Image
                src="/assets/images/youtube.svg"
                alt="YouTube"
                width={30}
                height={30}
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
