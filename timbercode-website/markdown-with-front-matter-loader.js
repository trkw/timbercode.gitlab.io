// TODO CLEAN-UP, REFACTORING

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
let {BASE_URL, IMAGES_BASE_URL} = require('./config')

const highlight = (str, lang) => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      // TODO how to tell highlight.js that `test` is a valid language, which just have no keyword nor comments?
      return '<pre class="post__content__code"><code>' +
        hljs.highlight(lang, str, true).value +
        '</code></pre>'
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
  // https://pl.wikipedia.org/wiki/Cudzys%C5%82%C3%B3w
  quotes: ['„', '”', '‚', '’'],
  highlight,
  replaceLink: (link) => {
    if (shouldPrefix && path.isAbsolute(link)) {
      return linkPrefix + link
    }
    return link
  },
  modifyToken: function (token, env) {
    switch (token.type) {
      case 'link_open':
        token.attrObj.target = '_blank' // set all links to open in new window
        break
      case 'code_inline':
        if (token.attrObj['class']) {
          token.attrObj['class'] += ' '
        } else {
          token.attrObj['class'] = ''
        }
        token.attrObj['class'] += 'post__content__code_inline'
        break
      case 'image':
        if (token.attrObj['class']) {
          token.attrObj['class'] += ' '
        } else {
          token.attrObj['class'] = ''
        }
        token.attrObj['class'] += 'post__content__image'
        break
    }
  }
})
  .use(require('markdown-it-replace-link'))
  .use(require('markdown-it-modify-token'))

module.exports = function (content) {
  const loader = this

  loader.cacheable()

  // const query = loaderUtils.parseQuery(loader.query)
  const query = loader.query
  const linkPrefix = query.config.linkPrefix || ''
  const shouldPrefix = query.shouldPrefix

  const meta = frontMatter(content)
  if (meta.attributes.image) {
    meta.attributes.image = meta.attributes.image.replace(/{{IMAGES_BASE_URL}}/g, IMAGES_BASE_URL)
  }
  const markdownBody = meta.body.replace(/{{IMAGES_BASE_URL}}/g, IMAGES_BASE_URL)
  const htmlBody = md(linkPrefix, shouldPrefix).render(markdownBody)
  const result = objectAssign({}, meta.attributes, {
    body: htmlBody
  })
  result.route = '/blog' + result.permalink
  result.url = `${BASE_URL}/blog${result.permalink}`
  result.canonicalUrl = `https://timbercode.pl/blog${result.permalink}`
  result.uniqueId = `blog${result.permalink}`
  loader.value = result
  return `module.exports = ${JSON.stringify(result)}`
}
