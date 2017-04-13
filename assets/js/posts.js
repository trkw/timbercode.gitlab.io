const requireFromDir = require.context('~pages/blog', true, /\.md$/)
const posts = requireFromDir.keys().map(path => {
  const post = requireFromDir(`${path}`)
  return {
    title: post.title,
    route: post.route,
    tags: post.tags || []
  }
})

module.exports = posts
