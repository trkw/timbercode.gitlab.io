// TODO It's confusing that if this file is read on server, then we read...
// TODO ... real `process.env` here where every variable is a string,...
// TODO ... whereas on the client side `process.env` here contains only...
// TODO ... variables reassigned in `nuxt.conf.js` to `env`, and they...
// TODO ... can have other types too (eg. boolean). Consider using...
// TODO ... this file on the server side only.

const isProduction = process.env.NODE_ENV === 'production'
const shouldUseCdn = isProduction
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
const IMAGES_BASE_URL = shouldUseCdn ? 'https://static.timbercode.pl' : ''
const GA_TRACKING_ID = process.env.GA_TRACKING_ID
const DISQUS_SHORTNAME = process.env.DISQUS_SHORTNAME
const showFuturePosts = (process.env.SHOW_FUTURE_POSTS === 'true')
const GOOGLE_SITE_VERIFICATION_TAG_CONTENT = process.env.GOOGLE_SITE_VERIFICATION_TAG_CONTENT

if (isProduction && !GA_TRACKING_ID) {
  console.error('GA_TRACKING_ID should be set for production setup')
  process.exit(1)
}
if (isProduction && !DISQUS_SHORTNAME) {
  console.error('DISQUS_SHORTNAME should be set for production setup')
  process.exit(1)
}

module.exports = {
  BASE_URL,
  IMAGES_BASE_URL,
  GA_TRACKING_ID,
  DISQUS_SHORTNAME,
  isProduction,
  showFuturePosts,
  GOOGLE_SITE_VERIFICATION_TAG_CONTENT
}
