import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import {
  zapfHumanist601Roman,
  zapfHumanist601Bold,
  zapfHumanist601Semi,
  zapfHumanist601Ultra,
} from "./fonts";

// Open Sans as default font
const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Panchshil - India's Leading Luxury Developer",
  description:
    "Since 2002, Panchshil Realty has set benchmarks in design, delivery and urban placemaking. From landmark residences and global office districts to iconic hospitality and convention destinations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${zapfHumanist601Roman.variable} ${zapfHumanist601Bold.variable} ${zapfHumanist601Semi.variable} ${zapfHumanist601Ultra.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
