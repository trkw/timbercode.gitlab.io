const _ = require('lodash')
const {BASE_URL, IMAGES_BASE_URL} = require('./config')

module.exports = {
  head: {
    htmlAttrs: {
      lang: 'pl-PL'
    },
    titleTemplate: '%s | Timbercode',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Blog Timbercode.pl'},
      {name: 'twitter:card', content: 'summary_large_image'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: `${IMAGES_BASE_URL}/favicon-32x32.png`},
      {rel: 'alternate', type: 'application/atom+xml', title: 'Timbercode', href: `${BASE_URL}/blog/feed.xml`},
    ]
  },
  css: [
    'normalize.css/normalize.css',
    'highlight.js/styles/default.css',
    '~assets/css/timbercode-website.css'
  ],
  router: {
    base: (process.env.BASE_PATH || '') + '/',
    extendRoutes (routes, resolve) {
      const loadPosts = require('./app/timbercode-website/load-posts')
      const posts = loadPosts()
      routes = routes.map(route => {
        if (typeof route === 'string') {
          route = applyPermalinkOn(route, posts)
        } else if (route.path !== undefined) {
          route.path = applyPermalinkOn(route.path, posts)
        }
        return route
      })
      console.log(routes)
    }
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

function applyPermalinkOn (route, posts) {
  const post = _(posts).find(p => p.originalRoute === route)
  if (post && post.route) {
    return post.route
  }
  return route
}
