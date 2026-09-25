import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/insursure-os",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
