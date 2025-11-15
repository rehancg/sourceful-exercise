import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sourceful.com',
      },
      // Add more image domains as needed
    ],
  },
};

export default nextConfig;
