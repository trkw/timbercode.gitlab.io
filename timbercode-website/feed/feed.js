'use strict'

// TODO CLEAN-UP, REFACTORING

const moment = require('moment')

module.exports = {
  generateAtomFrom (configuration) {
    return generateFeedFrom(configuration).atom1()
  },
  generateRssFrom (configuration) {
    return generateFeedFrom(configuration).rss2()
  }
}

function generateFeedFrom ({
                             BASE_URL,
                             IMAGES_BASE_URL,
                             posts,
                             feedTitle,
                             feedDescription,
                             showFuturePosts
                           }) {
  const timeNow = moment()
  const Feed = require('feed')
  const feed = new Feed({
    title: feedTitle,
    description: feedDescription,
    id: BASE_URL,
    link: BASE_URL,
    image: `${IMAGES_BASE_URL}/favicon-32x32.png`,
    updated: timeNow.toDate(),
    author: {
      name: 'Paweł Barszcz',
      email: 'pawelbarszcz@gmail.com',
      link: BASE_URL
    }
  })
  posts
    .filter(post => {
      if (showFuturePosts) {
        return true
      }
      return moment(post.date, moment.ISO_8601).isSameOrBefore(timeNow)
    })
    .forEach(post => {
      feed.addItem({
        title: post.title,
        id: `${BASE_URL}${post.route}`,
        link: `${BASE_URL}${post.route}`,
        description: post.description,
        author: [{
          name: 'Paweł Barszcz',
          email: 'pawelbarszcz@gmail.com',
          link: BASE_URL
        }],
        date: moment(post.date, moment.ISO_8601).toDate(),
        image: post.image
      })
    })
  return feed
}
