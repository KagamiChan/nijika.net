/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js')
import { withContentlayer } from 'next-contentlayer'
import { withSentryConfig } from '@sentry/nextjs'
import createMDX from '@next/mdx'

/** @type {import("next").NextConfig} */
const config = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  sentry: {
    hideSourceMaps: true,
    tunnelRoute: '/telemetry-tunnel',
  },
}

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
}

const withMDX = createMDX()

export default withSentryConfig(
  withContentlayer(withMDX(config)),
  sentryWebpackPluginOptions,
)
