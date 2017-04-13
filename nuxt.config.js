const _ = require('lodash')
const fs = require('fs')
const frontMatter = require('front-matter')

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
      {rel: 'icon', type: 'image/x-icon', href: 'https://static.timbercode.pl/favicon-32x32.png'}
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
      const pagesDir = './pages'
      const paths = findPosts(`${pagesDir}/blog/POSTS`)
      const posts = paths.map(path => {
        const post = fs.readFileSync(path, 'utf8')
        const fm = frontMatter(post)
        let pathWithoutPagesDir = path.substring(pagesDir.length)
        return {
          originalRoute: pathWithoutPagesDir.substring(0, pathWithoutPagesDir.length - '.md'.length),
          permalink: fm.attributes.permalink
        }
      })
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

function findPosts (dir, accumulatedFiles) {
  const files = fs.readdirSync(dir)
  accumulatedFiles = accumulatedFiles || []
  files.forEach(function (file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      accumulatedFiles = findPosts(dir + '/' + file, accumulatedFiles)
    } else {
      if (file.endsWith('.md')) {
        let path = dir + '/' + file
        accumulatedFiles.push(path)
      }
    }
  })
  return accumulatedFiles
}

function applyPermalinkOn (route, posts) {
  const post = _(posts).find(p => p.originalRoute === route)
  if (post && post.permalink) {
    return '/blog' + post.permalink
  }
  return route
}
