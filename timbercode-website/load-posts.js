const fs = require('fs')
const frontMatter = require('front-matter')
// TODO `import` syntax?
const moment = require('moment')

module.exports = loadPosts

function loadPosts () {
  const pagesDir = './timbercode-website/pages'
  const paths = findPosts(`${pagesDir}/blog/POSTS`)
  const posts = paths.map(path => {
    const post = fs.readFileSync(path, 'utf8')
    const fm = frontMatter(post)
    let pathWithoutPagesDir = path.substring(pagesDir.length)
    return {
      originalRoute: pathWithoutPagesDir.substring(0, pathWithoutPagesDir.length - '.md'.length),
      route: '/blog' + fm.attributes.permalink,
      title: fm.attributes.title,
      description: fm.attributes.description,
      image: fm.attributes.image,
      categories: fm.attributes.categories,
      tags: fm.attributes.tags,
      // TODO use moment.js, starting here?
      date: fm.attributes.date,
      uniqueId: `blog${fm.attributes.permalink}`
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

  return posts
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
