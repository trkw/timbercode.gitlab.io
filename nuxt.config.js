const _ = require('lodash')
const {BASE_URL, IMAGES_BASE_URL, GA_TRACKING_ID} = require('./timbercode-website/config')

module.exports = {
  plugins: [
    {src: '~plugins/google-analytics.js', ssr: false}
  ],
  performance: {
    gzip: false
  },
  dev: process.env.NODE_ENV !== 'production',
  srcDir: 'timbercode-website',
  env: {
    BASE_URL,
    IMAGES_BASE_URL,
    GA_TRACKING_ID
  },
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
      {rel: 'alternate', type: 'application/atom+xml', title: 'Timbercode', href: `${BASE_URL}/blog/feed.xml`}
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
      const loadPosts = require('./timbercode-website/load-posts')
      const posts = loadPosts()
      routes = adjustRoutes(routes, posts)
      console.log('Generated routes:')
      printRoutes(routes)
    }
  },
  build: {
    loaders: [
      {
        test: /\.md$/,
        loader: './timbercode-website/markdown-with-front-matter-loader.js',
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

function adjustRoutes (routes, posts) {
  return routes.map(route => {
    if (typeof route === 'string') {
      const post = _(posts).find(p => p.originalRoute === route)
      if (post) {
        return adjustRoutePath(route, post)
      }
    } else if (route.path !== undefined) {
      const post = _(posts).find(p => p.originalRoute === route.path)
      if (post) {
        route.path = adjustRoutePath(route.path, post)
        route.name = adjustRouteName(route.name, post)
        return route
      }
    }
    return route
  })
}

function adjustRoutePath (routePath, post) {
  return post.route || routePath
}

function adjustRouteName (routeName, post) {
  return post.uniqueId || routeName
}

function printRoutes (routes) {
  routes.forEach(route => {
    console.log(route)
  })
}
