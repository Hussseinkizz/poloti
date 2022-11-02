/** @type {import('next').NextConfig} */

const withPWA  = require("next-pwa");
module.exports = withPWA({
 //...before
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  //...after
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'hjqtglhztxzfhnteptxu.supabase.co'],
  },
};

module.exports = nextConfig;