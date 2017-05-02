// TODO `import` syntax?
// TODO separate server part from client/server Nuxt part ?
const moment = require('moment')
const requireFromDir = require.context('~pages/blog', true, /\.md$/)

// TODO make it const
let posts = requireFromDir.keys().map(path => {
  const post = requireFromDir(`${path}`)
  return {
    title: post.title,
    tags: post.tags || [],
    route: '/blog' + post.permalink,
    canonicalUrl: `https://timbercode.pl/blog${post.permalink}`,
    uniqueId: `blog${post.permalink}`,
    // TODO convert to moment.js here, not later
    date: post.date
  }
})

posts.sort((post1, post2) => {
  const date1 = moment(post1.date, moment.ISO_8601)
  const date2 = moment(post2.date, moment.ISO_8601)
  if (date1.isAfter(date2)) return -1
  if (date1.isBefore(date2)) return 1
  // TODO what about corner cases? Would two posts with same date be always in same order?
  return 0
})

if (!process.env.showFuturePosts) {
  const timeNow = moment()
  posts = posts.filter(post => moment(post.date, moment.ISO_8601).isSameOrBefore(timeNow))
}

module.exports = posts
