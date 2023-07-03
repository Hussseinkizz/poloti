/** @type {import('next').NextConfig} */

const runtimeCaching = require('next-pwa/cache.js');
const isProduction = process.env.NODE_ENV === 'production';

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: !isProduction,
  runtimeCaching,
});

const nextConfig = withPWA({
  // next.js config
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['localhost', 'hjqtglhztxzfhnteptxu.supabase.co'],
  },
});
module.exports = nextConfig;
