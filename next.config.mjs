/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/loja',        destination: '/store',        permanent: true },
      { source: '/loja/:path*', destination: '/store/:path*', permanent: true },
    ];
  },
}

export default nextConfig
