import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["k99y6luq4c.ufs.sh"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
