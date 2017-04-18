const shouldUseCdn = process.env.NODE_ENV === 'production'
const BASE_URL = process.env.BASE_URL || ''
const IMAGES_BASE_URL = shouldUseCdn ? 'https://static.timbercode.pl' : ''

module.exports = {
  BASE_URL,
  IMAGES_BASE_URL
}
