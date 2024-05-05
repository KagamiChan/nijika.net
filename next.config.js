/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js')
import { withSentryConfig } from '@sentry/nextjs'
import { build } from 'velite'

class VeliteWebpackPlugin {
  static started = false
  apply(/** @type {import('webpack').Compiler} */ compiler) {
    // executed three times in nextjs
    // twice for the server (nodejs / edge runtime) and once for the client
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return
      VeliteWebpackPlugin.started = true
      const dev = compiler.options.mode === 'development'
      await build({ watch: dev, clean: !dev })
    })
  }
}

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
  webpack: (/** @type {import("webpack").Configuration} */ config) => {
    config.plugins?.push(new VeliteWebpackPlugin())
    return config
  },
}

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
}

export default withSentryConfig(config, sentryWebpackPluginOptions)
