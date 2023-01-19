/** @type {import('next').NextConfig} */

const path = require("path");
const withSass = require("@zeit/next-sass");
module.exports = withSass({
  cssModules: true,
  poweredByHeader: false,
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "my-build-id";
  },
});

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
