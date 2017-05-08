const _ = require('lodash')
const {
  BASE_URL,
  IMAGES_BASE_URL,
  GA_TRACKING_ID,
  DISQUS_SHORTNAME,
  isProduction,
  showFuturePosts,
  GOOGLE_SITE_VERIFICATION_TAG_CONTENT,
  TITLE
} = require('./timbercode-website/config')

const head = {
  htmlAttrs: {
    lang: 'pl-PL'
  },
  titleTemplate: `%s | ${TITLE}`,
  meta: [
    {charset: 'utf-8'},
    {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'},
    {name: 'viewport', content: 'width=device-width, initial-scale=1'},
    {hid: 'meta_description', name: 'description', content: 'Blog Timbercode.pl'},
    // Twitter
    {hid: 'meta_twitter:card', name: 'twitter:card', content: 'summary_large_image'},
    {hid: 'meta_twitter:site', name: 'twitter:site', content: '@timbercodepl'},
    {hid: 'meta_twitter:title', name: 'twitter:title', content: 'Timbercode'},
    {
      hid: 'meta_twitter:image',
      name: 'twitter:image',
      content: `${IMAGES_BASE_URL}/timbercode_sygnet_v1_512x512.png`
    },
    {hid: 'meta_twitter:description', name: 'twitter:description', content: 'Blog Timbercode.pl'},
    // Facebook
    {hid: 'meta_og:title', name: 'og:title', content: 'Timbercode'},
    {hid: 'meta_og:url', name: 'og:url', content: BASE_URL},
    {hid: 'meta_og:description', name: 'og:description', content: 'Blog Timbercode.pl'},
    {hid: 'meta_og:image', name: 'og:image', content: `${IMAGES_BASE_URL}/timbercode_sygnet_v1_512x512.png`},
    {hid: 'meta_og:site_name', name: 'og:site_name', content: 'Timbercode'},
    {hid: 'meta_article:publisher', name: 'article:publisher', content: 'https://www.facebook.com/timbercode'}
  ],
  link: [
    {hid: 'link_canonical', rel: 'canonical', href: 'http://timbercode.pl'},
    {rel: 'icon', type: 'image/x-icon', href: `${IMAGES_BASE_URL}/favicon-32x32.png`},
    {rel: 'shortcut icon', type: 'image/x-icon', href: `${IMAGES_BASE_URL}/favicon-32x32.png`},
    {rel: 'alternate', type: 'application/atom+xml', title: 'Timbercode', href: '/blog/feed.xml'},
    {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:400,700'}
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: '{' +
      '"@context": "http://schema.org", ' +
      '"@type": "WebSite", ' +
      '"name": "Timbercode", ' +
      '"headline": "Timbercode", ' +
      '"description": "Timbercode", ' +
      '"publisher": {' +
      '"@type": "Organization", ' +
      '"logo": {' +
      '"@type": "ImageObject", ' +
      `"url": "${IMAGES_BASE_URL}/timbercode_sygnet_v1_512x512.png"` +
      '}' +
      '}, ' +
      // TODO canonical URL or regular one?
      `"url": "${BASE_URL}"` +
      '}'
    }
  ]
}

if (GOOGLE_SITE_VERIFICATION_TAG_CONTENT) {
  head.meta.push(
    // Google Search Console verification tag (do not remove)
    {name: 'google-site-verification', content: GOOGLE_SITE_VERIFICATION_TAG_CONTENT}
  )
}

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
    GA_TRACKING_ID,
    DISQUS_SHORTNAME,
    isProduction,
    showFuturePosts,
    TITLE
  },
  head: head,
  css: [
    'normalize.css/normalize.css',
    // TODO which syntax-highlighting style to choose? Or even do not style it to not rely on lack of languages like Kotlin?
    // 'highlight.js/styles/default.css',
    '~assets/css/timbercode-website.css'
  ],
  router: {
    base: (process.env.BASE_PATH || '') + '/',
    extendRoutes (routes, resolve) {
      const loadPosts = require('./timbercode-website/load-posts')
      const posts = loadPosts()
      adjustRoutes(routes, posts)
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
      },
      {
        test: /\.svg/,
        use: {
          // TODO Is it a "good enough" loader? What is the industry standard for handling SVG?
          loader: 'svg-url-loader',
          options: {}
        }
      }
    ]
  }
}

function adjustRoutes (routes, posts) {
  return routes.forEach(route => {
    const post = _(posts).find(p => p.originalRoute === route.path)
    if (post) {
      route.path = adjustRoutePath(route.path, post)
      route.name = adjustRouteName(route.name, post)
    }
    if (route.children) {
      adjustRoutes(route.children, posts)
    }
  })
}

function adjustRoutePath (routePath, post) {
  return post.route || routePath
}

function adjustRouteName (routeName, post) {
  return post.uniqueId || routeName
}
