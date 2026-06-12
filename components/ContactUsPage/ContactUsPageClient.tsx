"use client";

import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import AboutUsHero from "@/components/AboutUsHero/AboutUsHero";
import { contactPageData, branches } from "@/app/contact-us/contact.data";

export default function ContactUsPageClient() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    purpose: "",
  });

  const purposeOptions = ["General", "Careers"];
  const [isPurposeOpen, setIsPurposeOpen] = useState(false);
  const purposeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        purposeRef.current &&
        !purposeRef.current.contains(event.target as Node)
      ) {
        setIsPurposeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePurposeSelect = (value: string) => {
    setForm((s) => ({ ...s, purpose: value }));
    setIsPurposeOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // currently static — integrate API later
    alert("Enquiry submitted (demo)");
    setForm({
      name: "",
      phone: "",
      email: "",
      message: "",
      purpose: "General",
    });
  };

  return (
    <main className="min-h-screen bg-[#FFFAF7]">
      <Header />
      <section className="bg-white">
        <AboutUsHero
          hero={{
            imageSrc: contactPageData.imageSrc || contactPageData.imageSrc,
            title: contactPageData.title,
            description: contactPageData.description,
          }}
          //   compact
        />
      </section>

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="text-lg font-medium tracking-[0.2em] text-gold-beige mb-2 uppercase">
              Get In Touch
            </div>
            <h2 className="text-2xl md:text-[28px] font-display-semi text-black uppercase mb-8 md:mb-12">
              Send Us A Message
            </h2>
            <p className="text-gray-600 max-w-xl mb-8">
              Whether you’re exploring a new residence, planning a partnership
              or simply curious about our portfolio, our team is here to help.
            </p>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full pr-4 py-2.5 border-b border-gold-beige text-black-chocolate text-base placeholder-black/50 focus:outline-none focus:border-gold-beige "
              />
              {/* Purpose dropdown (checkbox-style list copied from StickyBottomBar) */}
              <div
                className="relative"
                ref={(el) => {
                  purposeRef.current = el;
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsPurposeOpen((s) => !s)}
                  className={`w-full flex items-center justify-between pr-4 py-2.5 bg-white text-black-chocolate text-base border-b focus:outline-none focus:border-gold-beige appearance-none border-gold-beige`}
                >
                  <span>{form.purpose || "Purpose of Enquiry"}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${isPurposeOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isPurposeOpen && (
                  <div className="absolute top-full left-0 mb-2 border border-golden-beige shadow-lg min-w-[220px] max-h-60 overflow-y-auto z-10 bg-white">
                    <ul>
                      {purposeOptions.map((option) => {
                        const selected = form.purpose === option;
                        return (
                          <li key={option}>
                            <button
                              type="button"
                              onClick={() => handlePurposeSelect(option)}
                              className={`w-full text-black-chocolate text-left px-4 py-2 cursor-pointer text-sm flex items-center gap-2 ${selected ? "bg-gold-beige font-medium text-white" : ""}`}
                            >
                              <span
                                className={`w-3 h-3 border flex items-center justify-center ${selected ? "bg-gold-beige border-white" : "border-black"}`}
                              >
                                {selected && (
                                  <svg
                                    className="w-3 h-3 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </span>
                              {option}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="w-full pr-4 py-2.5 border-b border-gold-beige text-black-chocolate text-base placeholder-black/50 focus:outline-none focus:border-gold-beige "
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full pr-4 py-2.5 border-b border-gold-beige text-black-chocolate text-base placeholder-black/50 focus:outline-none focus:border-gold-beige "
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Message"
                className="md:col-span-2 border-b border-gold-beige text-black-chocolate text-base placeholder-black/50 focus:outline-none focus:border-gold-beige "
              />

              <div className="md:col-span-2 mt-4 flex items-center gap-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#9E8C70] text-white cursor-pointer"
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  className="px-6 py-3 border border-[#9E8C70] text-[#9E8C70] font-display-normal cursor-pointer"
                >
                  Chat with us
                </button>
              </div>
            </form>
          </div>

          <div>
            <div className="w-full h-[420px] shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.4610180907143!2d73.88975382520567!3d18.553243111974293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c11f0e00be69%3A0x78f5a4be779da557!2sPanchshil%20Tech%20Park%20One!5e0!3m2!1sen!2sin!4v1781247600681!5m2!1sen!2sin"
                width="600"
                height="450"
                style={{ border: 0 }}
                // allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {branches.map((b) => (
            <div key={b.title} className="bg- text-black border p-8 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#FFF6F2] mb-4 flex items-center justify-center">
                {!b.phone ? (
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
                      stroke="#9e8c70"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                      stroke="#9e8c70"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width="20"
                    height="20"
                    viewBox="0 0 256 256"
                    fill="#9e8c70"
                  >
                    <g
                      style={{
                        stroke: "none",
                        strokeWidth: 0,
                        strokeDasharray: "none",
                        strokeLinecap: "butt",
                        strokeLinejoin: "miter",
                        strokeMiterlimit: 10,
                        fill: "#9e8c70",
                        fillRule: "nonzero",
                        opacity: 1,
                      }}
                      stroke="#9e8c70"
                      transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                    >
                      <path
                        d="M 45 90 c -1.062 0 -2.043 -0.561 -2.583 -1.475 l -4.471 -7.563 c -9.222 -15.591 -17.933 -30.317 -20.893 -36.258 c -2.086 -4.277 -3.138 -8.852 -3.138 -13.62 C 13.916 13.944 27.86 0 45 0 c 17.141 0 31.085 13.944 31.085 31.084 c 0 4.764 -1.051 9.339 -3.124 13.596 c -0.021 0.042 -0.042 0.083 -0.063 0.124 c -3.007 6.005 -11.672 20.654 -20.843 36.159 l -4.472 7.563 C 47.044 89.439 46.062 90 45 90 z M 45 6 C 31.168 6 19.916 17.253 19.916 31.084 c 0 3.848 0.847 7.539 2.518 10.969 c 2.852 5.721 11.909 21.033 20.667 35.839 L 45 81.104 l 1.89 -3.196 c 8.763 -14.813 17.823 -30.131 20.687 -35.879 c 0.012 -0.022 0.023 -0.045 0.035 -0.067 c 1.642 -3.406 2.474 -7.065 2.474 -10.877 C 70.085 17.253 58.832 6 45 6 z"
                        style={{
                          stroke: "none",
                          strokeWidth: 1,
                          strokeDasharray: "none",
                          strokeLinecap: "butt",
                          strokeLinejoin: "miter",
                          strokeMiterlimit: 10,
                          fill: "#9e8c70",
                          fillRule: "nonzero",
                          opacity: 1,
                        }}
                        transform=" matrix(1 0 0 1 0 0) "
                        stroke-linecap="round"
                      />
                      <path
                        d="M 45 44.597 c -8.076 0 -14.646 -6.57 -14.646 -14.646 S 36.924 15.306 45 15.306 c 8.075 0 14.646 6.57 14.646 14.646 S 53.075 44.597 45 44.597 z M 45 21.306 c -4.767 0 -8.646 3.878 -8.646 8.646 s 3.878 8.646 8.646 8.646 c 4.768 0 8.646 -3.878 8.646 -8.646 S 49.768 21.306 45 21.306 z"
                        style={{
                          stroke: "none",
                          strokeWidth: 1,
                          strokeDasharray: "none",
                          strokeLinecap: "butt",
                          strokeLinejoin: "miter",
                          strokeMiterlimit: 10,
                          fill: "#9e8c70",
                          fillRule: "nonzero",
                          opacity: 1,
                        }}
                        transform=" matrix(1 0 0 1 0 0) "
                        stroke-linecap="round"
                      />
                    </g>
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-display-semi mb-3">{b.title}</h3>
              <p className="text-gray-700 whitespace-pre-line mb-4">
                {b.address}
              </p>
              {b.phone && <p className="text-gray-700">{b.phone}</p>}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
