module.exports = {
  head: {
    title: 'Timbercode',
    link: [
      {rel: 'icon', type: 'image/x-icon', href: 'https://static.timbercode.pl/favicon-32x32.png'}
    ]
  },
  css: [
    'normalize.css/normalize.css',
    'highlight.js/styles/default.css',
    '~assets/css/timbercode-website.css'
  ],
  router: {
    base: (process.env.BASE_PATH || '') + '/'
  },
  build: {
    loaders: [
      {
        test: /\.md$/,
        loader: './app/markdown-with-front-matter-loader.js',
        query: {
          config: {
            linkPrefix: process.env.BASE_PATH || ''
          },
          shouldPrefix: true
        }
      }
    ]
  }
}
