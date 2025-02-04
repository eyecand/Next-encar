import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ci.encar.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      { ignoreRestSiblings: true },
    ],
  },
};
export default nextConfig;
