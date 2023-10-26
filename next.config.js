/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "seedrs.imgix.net",
      "service-tokenization-demo-bucket.s3.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
