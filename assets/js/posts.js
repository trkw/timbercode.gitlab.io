const requireFromDir = require.context('~pages/blog', true, /\.md$/)
const posts = requireFromDir.keys().map(path => {
  const post = requireFromDir(`${path}`)
  return {
    path: '/blog/' + path.substring(0, path.length - 3),
    title: post.title,
    route: post.route,
    tags: post.tags || []
  }
})

module.exports = posts
