/**
 * @type {import('@remix-run/dev').AppConfig}
 */
const cloudflarePagesConfig = {
  serverBuildTarget: 'cloudflare-pages',
  server: './server-cloudflare-pages.js',
  ignoredRouteFiles: ['**/.*'],
};
/**
 * @type {import('@remix-run/dev').AppConfig}
 */
const netlifyConfig = {
  serverBuildTarget: 'netlify',
  server: './server-netlify.js',
  ignoredRouteFiles: ['**/.*'],
};
/**
 * @type {import('@remix-run/dev').AppConfig}
 */
const devConfig = {
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildPath: './build/index.js',
  devServerPort: 8002,
  ignoredRouteFiles: ['.*'],
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: false,
  },
};

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
const buildConfig = {
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildPath: './build/index.js',
  ignoredRouteFiles: ['.*'],
};

function selectConfig() {
  if (!['development', 'production'].includes(process.env.NODE_ENV))
    throw `Unknown NODE_ENV: ${process.env.NODE_ENV}`;
  if (process.env.NODE_ENV === 'development') return devConfig;
  if (!process.env.CF_PAGES && !process.env.NETLIFY) return buildConfig;
  if (process.env.CF_PAGES) return cloudflarePagesConfig;
  if (process.env.NETLIFY) return netlifyConfig;
  throw `Cannot select config`;
}

module.exports = selectConfig();
