const withAntdLess = require('next-plugin-antd-less');

const nextConfig = {
  reactStrictMode: false,
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://pcy09.github.io/bausch_app_2025_content' : '',
  images: {
    unoptimized: true, // 이미지 최적화 비활성화
  },
};

module.exports = withAntdLess(nextConfig);
