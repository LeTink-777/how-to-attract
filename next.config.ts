import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The PDF route reads the Cyrillic TTFs at runtime, so they must be traced
  // into the serverless bundle — nothing imports them statically.
  outputFileTracingIncludes: {
    "/api/**": ["./assets/fonts/**"],
  },
  // Apex to www. Only fires once vlyubit-sebya.ru actually points at this project;
  // it is inert on the .vercel.app domain.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "vlyubit-sebya.ru" }],
        destination: "https://www.vlyubit-sebya.ru/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
