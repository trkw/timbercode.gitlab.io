/*
 * Copied from:
 *   https://github.com/gatsbyjs/gatsby/blob/7ce43ca62d001b30813483134239ebaa6cca085e/lib/loaders/markdown-loader/index.js
 */

// TODO it would be better to export JSON, and then use json-loader

const frontMatter = require('front-matter')
const markdownIt = require('markdown-it')
const hljs = require('highlight.js')
const objectAssign = require('object-assign')
const path = require('path')
// const loaderUtils = require('loader-utils')

const highlight = (str, lang) => {
  if ((lang !== null) && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value
    } catch (_error) {
      console.error(_error)
    }
  }
  try {
    return hljs.highlightAuto(str).value
  } catch (_error) {
    console.error(_error)
  }
  return ''
}

const md = (linkPrefix, shouldPrefix) => markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight,
  replaceLink: (link) => {
    if (shouldPrefix && path.isAbsolute(link)) {
      return linkPrefix + link
    }
    return link
  }
})
  .use(require('markdown-it-replace-link'))

module.exports = function (content) {
  const loader = this

  loader.cacheable()

  // const query = loaderUtils.parseQuery(loader.query)
  const query = loader.query
  const linkPrefix = query.config.linkPrefix || ''
  const shouldPrefix = query.shouldPrefix

  const meta = frontMatter(content)
  const shouldUseCdn = process.env.NODE_ENV === 'production'
  const imagesBaseUrl = shouldUseCdn ? 'https://static.timbercode.pl' : ''
  const markdownBody = meta.body.replace(/{{IMAGES_BASE_URL}}/g, imagesBaseUrl)
  const htmlBody = md(linkPrefix, shouldPrefix).render(markdownBody)
  const result = objectAssign({}, meta.attributes, {
    body: htmlBody
  })
  loader.value = result
  result.route = loader.resourcePath.substring(loader.resourcePath.search('pages/') + 5, loader.resourcePath.length - 3)
  return `module.exports = ${JSON.stringify(result)}`
}
