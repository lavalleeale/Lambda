/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    outputStandalone: true,
  },
  async rewrites() {
    return [
      {
        source: "/home/:page",
        destination: "/",
      },
      {
        source: "/home",
        destination: "/",
      },
    ];
  },
};
