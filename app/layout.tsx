import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import {
  zapfHumanist601Roman,
  zapfHumanist601Bold,
  zapfHumanist601Semi,
  zapfHumanist601Ultra,
} from "./fonts";
import { AuthProvider } from "@/contexts/AuthProvider";
import { getAuthToken } from "@/api/CMS.api";

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
  icons: {
    apple: "/assets/images/apple-touch-icon.png",
    icon: [
      {
        url: "/assets/images/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/assets/images/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
  },
  manifest: "/assets/site.webmanifest",
};

interface AuthTokenResponse {
  token: string;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let initialToken: string | null = null;
  let initialError: string | null = null;

  try {
    const response = (await getAuthToken()) as AuthTokenResponse;
    if (response?.token && typeof response.token === "string") {
      initialToken = response.token;
    } else {
      initialError = "Token not found in response";
    }
  } catch (err) {
    initialError =
      err instanceof Error ? err.message : "Failed to fetch auth token";
    console.error("Error fetching auth token in layout:", err);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${openSans.variable} ${zapfHumanist601Roman.variable} ${zapfHumanist601Bold.variable} ${zapfHumanist601Semi.variable} ${zapfHumanist601Ultra.variable} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider initialToken={initialToken} initialError={initialError}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
