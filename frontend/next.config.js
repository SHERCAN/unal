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

  async rewrites() {
    const backendUrl = process.env.API_URL ? process.env.API_URL.replace('/api', '') : 'http://math-learning-backend:4000';
    return [
      {
        source: '/api/socket.io',
        destination: `${backendUrl}/socket.io/`,
      },
      {
        source: '/api/socket.io/:path*',
        destination: `${backendUrl}/socket.io/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;