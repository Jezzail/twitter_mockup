/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["rb.gy"],
  },
  env: {
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    SECRET: process.env.SECRET,
  },
};
