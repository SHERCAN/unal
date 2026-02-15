/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['img.youtube.com'],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
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