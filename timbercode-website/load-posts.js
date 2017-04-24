const fs = require('fs')
const frontMatter = require('front-matter')

module.exports = loadPosts

function loadPosts () {
  const pagesDir = './timbercode-website/pages'
  const paths = findPosts(`${pagesDir}/blog/POSTS`)
  return paths.map(path => {
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
      date: fm.attributes.date,
      uniqueId: `blog${fm.attributes.permalink}`
    }
  })
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
