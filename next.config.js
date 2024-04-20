/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import { withContentlayer } from "next-contentlayer";
import createMDX from '@next/mdx'

/** @type {import("next").NextConfig} */
const config = {
  pageExtensions: ["tsx", "md", "mdx"],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const withMDX = createMDX()

export default withContentlayer(withMDX(config));
