import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'proyonanggan.my.id',
        port: '',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
    // Tambahan untuk kompatibilitas
    domains: ['proyonanggan.my.id', 'picsum.photos'],
  },
};

export default nextConfig;