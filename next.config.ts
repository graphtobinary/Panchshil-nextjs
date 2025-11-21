import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.panchshil.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "www.panchshil.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
