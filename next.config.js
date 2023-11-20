/** @type {import('next').NextConfig} */
const nextConfig = {
  // 버전 13까지 적용, 14이상 건드릴 필요없음
  experimental: {
    appDir: true,
    serverActions: true,
  },
};

module.exports = nextConfig;
