/** @type {import('next').NextConfig} */

// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ['localhost', 'hjqtglhztxzfhnteptxu.supabase.co'],
//   },
// };

// module.exports = nextConfig;

const withPWA = require('next-pwa');
module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'hjqtglhztxzfhnteptxu.supabase.co'],
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
  //...after
});
