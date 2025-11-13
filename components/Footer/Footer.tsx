"use client";

import Image from "next/image";

export function Footer() {
  const verticals: string[] = [
    "Office Parks",
    "Hospitality",
    "Data Centres",
    "Residential",
    "Retail & Fb",
  ];
  const countries: string[] = ["Dubai", "Maldives", "Srilanka"];
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
    "Prec",
    "Clients",
    "Awards",
  ];
  return (
    <footer className="w-full bg-[#FFFAF7] text-black-chocolate">
      {/* Row 1: Offices & Sales */}
      <div className="max-w-[1200px] mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* India office */}
        <div>
          <div className="text-sm font-display-semi tracking-[0.2em] text-black mb-4">
            HEAD OFFICE
          </div>
          <div className="space-y-2 text-sm">
            <p>Tech Park One,</p>
            <p>Tower E, 191 Yerwada,</p>
            <p>Pune - 411 006.</p>
            <p>India</p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Image
              src="/assets/images/call-icon.png"
              alt="Phone"
              width={18}
              height={18}
            />
            <span>+91 20 66473200</span>
          </div>
        </div>

        {/* International office */}
        <div>
          <div className="text-sm font-display-semi tracking-[0.2em] text-black mb-4">
            INTERNATIONAL OFFICE
          </div>
          <div className="space-y-2 text-sm">
            <p>One Offices,</p>
            <p>Level 5 office 5.11,</p>
            <p>One Za&apos;abeel, Za&apos;abeel Palace Street,</p>
            <p>Dubai, UAE</p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Image
              src="/assets/images/call-icon.png"
              alt="Phone"
              width={18}
              height={18}
            />
            <span>+971 04 545 3481</span>
          </div>
        </div>

        {/* Corporate office */}
        <div>
          <div className="text-sm font-display-semi tracking-[0.2em] text-black mb-4">
            CORPORATE OFFICE
          </div>
          <div className="space-y-2 text-sm">
            <p>Express Towers,</p>
            <p>20th Floor, Nariman Point,</p>
            <p>Mumbai - 400 021</p>
            <p>India</p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Image
              src="/assets/images/call-icon.png"
              alt="Phone"
              width={18}
              height={18}
            />
            <span>+91 22 66863939</span>
          </div>
        </div>

        {/* Sales enquiry */}
        <div>
          <div className="text-sm font-display-semi tracking-[0.2em] text-black mb-4">
            SALES ENQUIRY
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <div className="uppercase font-display-semi text-sm text-black mb-3">
                India
              </div>
              <div>+91 897 000 7700</div>
            </div>
            <div>
              <div className="uppercase font-display-semi text-sm text-black mb-3">
                Dubai
              </div>
              <div>+971 04 545 3481</div>
            </div>
          </div>
        </div>
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
            <form className="space-y-4">
              <div className="flex items-center gap-3  pb-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-transparent outline-none text-sm flex-1 placeholder-black/50 border-b border-gold-beige"
                />
                <button
                  type="submit"
                  className="text-sm text-gold-beige underline cursor-pointer"
                >
                  Submit
                </button>
              </div>
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
