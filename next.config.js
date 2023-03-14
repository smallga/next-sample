/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        // https://res.cloudinary.com/smallga/image/upload/v1543223643/image/%E5%9C%9F%E9%AD%A0%E9%AD%9A%E5%88%87%E7%89%87.jpg
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/smallga/image/upload/v1543223643/image/**.jpg',
      },
    ],
    // sassOptions: {
    //   includePaths: [path.join(__dirname, 'styles')],
    // },
  },
}

module.exports = nextConfig
