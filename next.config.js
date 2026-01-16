/** @type {import('next').NextConfig} */

const path = require("path");
const nextConfig = {
  cssModules: true,
  poweredByHeader: false,
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "my-build-id";
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;
