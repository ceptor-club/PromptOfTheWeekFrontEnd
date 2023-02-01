/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["media.tenor.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.tenor.com",
      },
    ],
  },
};

module.exports = nextConfig;
