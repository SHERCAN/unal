/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone',
  images: {
    domains: ['img.youtube.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ← AÑADE ESTO TEMPORALMENTE
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'X-Debug-Proxy', value: 'should-hit-route-handler' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;