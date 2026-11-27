import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    // Resume uploads go through a server action (4 MB file + form fields).
    serverActions: { bodySizeLimit: "5mb" },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    // The Vercel address is not public: send anyone who opens it (old links, old emails)
    // to the same page on the main domain.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "mindsoft-tech.vercel.app" }],
        destination: "https://www.mindsofttechsolution.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
