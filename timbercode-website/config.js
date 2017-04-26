const isProduction = process.env.NODE_ENV === 'production'
const shouldUseCdn = isProduction
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
const IMAGES_BASE_URL = shouldUseCdn ? 'https://static.timbercode.pl' : ''
const GA_TRACKING_ID = process.env.GA_TRACKING_ID

if (isProduction && !GA_TRACKING_ID) {
  console.error('GA_TRACKING_ID should be set for production setup')
  process.exit(1)
}

module.exports = {
  BASE_URL,
  IMAGES_BASE_URL,
  GA_TRACKING_ID
}
