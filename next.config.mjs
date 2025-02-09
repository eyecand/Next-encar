import withPlaiceholder from "@plaiceholder/next";

const nextConfig = {
  /* config options here */
  images: {
    // domains: ["ci.encar.com"],
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
