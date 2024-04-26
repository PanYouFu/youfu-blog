/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 开发模式默认会开启 React Strict Mode，会渲染2次，我们不需要
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

module.exports = nextConfig;
