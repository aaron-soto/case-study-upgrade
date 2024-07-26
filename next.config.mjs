import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

export default withPWA({
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
});
