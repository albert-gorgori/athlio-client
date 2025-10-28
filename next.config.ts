import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Configure external image hosts for next/image
// Replace or extend this list with the exact domains you load images from.
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Placeholder service used in the app
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      // Strava images (avatars, activity photos) use CloudFront
    //   { protocol: "https", hostname: "dgalywyr863hv.cloudfront.net", pathname: "/**" },
    //   { protocol: "https", hostname: "dgtzuqphqg23d.cloudfront.net", pathname: "/**" },
      // Add more as needed, e.g. OAuth avatars
      // { protocol: "https", hostname: "lh3.googleusercontent.com", pathname: "/**" },
      // { protocol: "https", hostname: "avatars.githubusercontent.com", pathname: "/**" },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
