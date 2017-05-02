'use strict'

// TODO ???
process.env.DEBUG = 'nuxt:*'

module.exports = TimbercodeWebsite

const {
  BASE_URL,
  IMAGES_BASE_URL,
  showFuturePosts
} = require('./config')

function TimbercodeWebsite () {
  const express = require('express')
  const moment = require('moment')
  const _ = require('lodash')
  const Nuxt = require('nuxt')
  const nuxtConfig = require('../nuxt.config.js')

  const loadPosts = require('./load-posts')
  const posts = loadPosts()

  const app = express()
  const nuxt = new Nuxt(nuxtConfig)

  app.get('/version', function (req, res) {
    const apiGatewayEventAsText = req.headers['x-apigateway-event'] || undefined
    if (apiGatewayEventAsText) {
      const apiGatewayEvent = JSON.parse(apiGatewayEventAsText)
      res.send(apiGatewayEvent.requestContext.stage)
    } else {
      res.send('(not defined)')
    }
  })

  app.get('/blog/feed.xml', function (req, res) {
    const feed = generateFeedFrom({
      BASE_URL,
      IMAGES_BASE_URL,
      posts,
      moment,
      feedTitle: 'Timbercode',
      feedDescription: 'wszystkie wpisy'
    })
    res.send(feed.atom1())
  })

  app.get('/blog/tag/:tag/feed.xml', function (req, res) {
    const tagToShow = req.params.tag
    let postsForTag = posts.filter(post => _(post.tags).includes(tagToShow))
    if (postsForTag.length > 0) {
      const feed = generateFeedFrom({
        BASE_URL,
        IMAGES_BASE_URL,
        posts: postsForTag,
        moment,
        feedTitle: `Timbercode - tag ${tagToShow}`,
        feedDescription: `wpisy otagowane ${tagToShow}`
      })
      res.send(feed.atom1())
    } else {
      res.sendStatus(404)
    }
  })

  app.use(nuxt.render)

  if (nuxtConfig.dev) {
    nuxt.build()
      .catch((error) => {
        console.error(error) // eslint-disable-line no-console
        process.exit(1)
      })
  }

  return app
}

function generateFeedFrom ({
                             BASE_URL,
                             IMAGES_BASE_URL,
                             posts,
                             moment,
                             feedTitle,
                             feedDescription
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
