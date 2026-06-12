import ContactUsPageClient from "@/components/ContactUsPage/ContactUsPageClient";

export const revalidate = 600;

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Panchshil",
};

export default function ContactPage() {
  // page currently uses static data only
  return <ContactUsPageClient />;
}
