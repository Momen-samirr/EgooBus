// next.config.js

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
  // Disable static export (optional)
  // By default, Next.js will use SSR if getServerSideProps is used
  // Static export is only triggered by `next export`
  experimental: {
    // Disable static optimization for pages without getServerSideProps or getStaticProps
    disableOptimizedLoading: true,
  },
};

export default nextConfig;
