/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com", // Replace with the correct hostname
        port: "",
        pathname: "/**", // Adjust the pathname pattern
      },
    ],
  },
};

module.exports = nextConfig;
