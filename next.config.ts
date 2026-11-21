import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      { source: "/resume", destination: "/Harshil_Maheshwari_Resume.pdf" },
    ];
  },
};

export default nextConfig;
