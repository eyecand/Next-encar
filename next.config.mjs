import withPlaiceholder from "@plaiceholder/next";

const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ci.encar.com",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "storage.yandexcloud.net",
        port: "",
        pathname: "/encar-foto-site/**",
        search: "",
      },
    ],
    unoptimized: true,
  },
};
// module.exports = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "ci.encar.com",
//         port: "",
//         pathname: "/**",
//         search: "",
//       },
//     ],
//   },
//   rules: {
//     "@typescript-eslint/no-unused-vars": [
//       "error",
//       { ignoreRestSiblings: true },
//     ],
//   },
// };
export default withPlaiceholder(nextConfig);
