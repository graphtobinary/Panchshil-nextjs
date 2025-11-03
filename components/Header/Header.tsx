import Image from "next/image";
import Link from "next/link";

export function Header() {
  const navItems = [
    { label: "About", href: "/about" },
    { label: "Residential", href: "/residential" },
    { label: "Office Parks", href: "/office-parks" },
    { label: "Data Centres", href: "/data-centres" },
    { label: "Hospitality", href: "/hospitality" },
    { label: "Retail & F&B", href: "/retail" },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        {/* Logo */}
        <div className="flex justify-center pt-8 pb-4">
          <Link href="/" className="flex flex-col items-center">
            <Image
              src="/assets/images/panchshil-logo.png"
              alt="Panchshil"
              width={98}
              height={98}
            />
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex justify-center">
          <ul className="flex flex-wrap justify-center gap-6 lg:gap-12 text-white">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={"#"}
                  className="text-sm lg:text-lg hover:opacity-80 transition-opacity font-light"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
