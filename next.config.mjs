import withPWA from "next-pwa";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        port: "",
        hostname: "st3.depositphotos.com",
      },
      {
        protocol: "https",
        port: "",
        hostname: "casestudyphoenix.com",
      },
      {
        protocol: "https",
        port: "",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        port: "",
        hostname: "encrypted-tbn3.gstatic.com",
      },
    ],
  },
};

// Wrap with PWA
export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig);
