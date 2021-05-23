module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{css,js,html,png,svg,jpg,gif,json}'],
  swDest: 'dist/sw.js',
  mode: 'production',
  cleanupOutdatedCaches: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'google-fonts-stylesheets',
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-webfonts',
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 180,
          maxEntries: 30,
        },
      },
    },
  ],
};
