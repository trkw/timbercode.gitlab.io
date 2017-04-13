const requireFromDir = require.context('~pages/blog', true, /\.md$/)
const posts = requireFromDir.keys().map(path => {
  const post = requireFromDir(`${path}`)
  return {
    title: post.title,
    tags: post.tags || [],
    route: '/blog' + post.permalink
  }
})

module.exports = posts
