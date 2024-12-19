/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
  'next-i18next.config.ts', // Ensure this path is correct
);

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ucarecdn.com',
      },
      {
        protocol: 'https',
        hostname: 'wordpress-1269066-4577871.cloudwaysapps.com',
      },
    ],
  },
}

export default withNextIntl(nextConfig);