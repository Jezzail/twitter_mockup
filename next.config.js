/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["rb.gy"],
  },
  env: {
    GOOGLE_ID:
      "556746757627-tpt0req8nc3fb3d5c7dd5n1bdijrloje.apps.googleusercontent.com",
    GOOGLE_SECRET: "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",
    NEXTAUTH_URL: "http://localhost:3000/",
    SECRET: "46pfOdkvbiJ3CpiH2lJLpym5B0qJtiDUwZZB0yHKh1A=",
  },
};
