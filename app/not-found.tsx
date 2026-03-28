import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFFAF7]">
      <Header />
      <div className="flex flex-col items-center justify-center px-6 py-24 md:py-32 text-center">
        <p className="text-sm tracking-[0.2em] uppercase text-gold-beige">
          Error 404
        </p>
        <h1 className="mt-4 text-3xl md:text-[40px] font-display-semi text-black-chocolate">
          Page not found
        </h1>
        <p className="mt-4 max-w-md text-base text-black/70 leading-relaxed">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex rounded-full border border-black/20 px-8 py-3 text-sm font-display-semi text-black transition-colors hover:bg-black hover:text-white"
        >
          Back to home
        </Link>
      </div>
      <Footer />
    </main>
  );
}
