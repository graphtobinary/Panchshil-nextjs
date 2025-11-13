import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/staging',
  assetPrefix: '/staging/',
  trailingSlash: false,
};

export default nextConfig;
