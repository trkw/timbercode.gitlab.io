// TODO CLEAN-UP, REFACTORING
// TODO js --> scripts
// TODO svg --> images?
// TODO when can we remove left-arrow.svg ?

// TODO `import` syntax?
// TODO separate server part from client/server Nuxt part ?
const moment = require('moment')
const requireFromDir = require.context('~pages/blog', true, /\.md$/)

// TODO make it const
let posts = requireFromDir.keys().map(path => {
  const post = requireFromDir(`${path}`)
  if (!post.permalink) {
    console.log(`Missing 'permalink' in '${path}'`)
    process.exit(1)
  }
  if (!post.title) {
    console.log(`Missing 'title' in '${path}'`)
    process.exit(1)
  }
  if (!post.image) {
    console.log(`Missing 'image' in '${path}'`)
    process.exit(1)
  }
  if (!post.date) {
    console.log(`Missing 'date' in '${path}'`)
    process.exit(1)
  }
  if (!post.date) {
    console.log(`Missing 'date' in '${path}'`)
    process.exit(1)
  }
  if (!post.category) {
    console.log(`Missing 'category' in '${path}'`)
    process.exit(1)
  }
  return {
    permalink: post.permalink,
    title: post.title,
    category: post.category,
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
