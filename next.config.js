// /** @type {import('next').NextConfig} */

const withAntdLess = require('next-plugin-antd-less');

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'zos.alipayobjects.com', // 기존 허용된 이미지 도메인
      'bauschlomb.blob.core.windows.net', // 새로운 호스트 추가
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.lensly.co.kr',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

// // next.config.js
module.exports = {
  basePath: '/sitemanager',
};

module.exports = withAntdLess({
  distDir: 'build',
  lessVarsFilePath: './src/styles/variables.less',
  ...nextConfig,
  webpack(config) {
    return config;
  },
});

// const withAntdLess = require('next-plugin-antd-less');

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   basePath: '/sitemanager', // Apache 프록시 경로와 일치
//   distDir: 'build', // 빌드 파일 디렉토리
//   reactStrictMode: false,
//   images: {
//     domains: ['zos.alipayobjects.com', 'bauschlomb.blob.core.windows.net', 'localhost'],
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: 'localhost',
//       },
//     ],
//   },
//   async rewrites() {
//     return [
//       {
//         source: '/api/sitemanager/:path*',
//         destination: 'http://localhost:8087/:path*', // API 프록시 설정
//       },
//       {
//         source: '/api/point/:path*',
//         destination: 'http://localhost:8086/:path*', // API 프록시 설정
//       },
//     ];
//   },
// };

// module.exports = withAntdLess({
//   ...nextConfig,
//   lessVarsFilePath: './src/styles/variables.less',
//   lessOptions: {
//     modifyVars: {
//       'primary-color': '#000',
//       'link-color': '#1DA57A',
//       'border-radius-base': '2px',
//     },
//     javascriptEnabled: true,
//   },
//   webpack(config) {
//     return config;
//   },
// });
