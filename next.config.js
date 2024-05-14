/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "media.discordapp.net",
      "assets.openai.com",
      "cdn.midjourney.com",
      "images.unsplash.com",
      "backend-actionise.herokuapp.com",
      "backendactionise.s3.eu-west-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
