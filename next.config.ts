import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.panchshil.com",
      },
      {
        protocol: "https",
        hostname: "www.panchshilprivilege.com",
      },
      {
        protocol: "https",
        hostname: "www.ventivehospitality.com",
      },
    ],
  },
};

export default nextConfig;
