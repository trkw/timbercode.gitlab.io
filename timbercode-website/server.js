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
  const _ = require('lodash')
  const Nuxt = require('nuxt')
  const nuxtConfig = require('../nuxt.config.js')

  const loadPosts = require('./load-posts')
  const Feed = require('./feed/feed')
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
    res.send(Feed.generateAtomFrom(generalFeedConfigurationFor(posts)))
  })
  app.get('/blog/feed.atom', function (req, res) {
    res.send(Feed.generateAtomFrom(generalFeedConfigurationFor(posts)))
  })
  app.get('/blog/feed.rss', function (req, res) {
    res.send(Feed.generateRssFrom(generalFeedConfigurationFor(posts)))
  })

  app.get('/blog/tag/:tag/feed.xml', function (req, res) {
    const tagToShow = req.params.tag
    // TODO encapsulate in some `Posts` object
    let postsForTag = posts.filter(post => _(post.tags).includes(tagToShow))
    if (postsForTag.length > 0) {
      res.send(Feed.generateAtomFrom(tagFeedConfigurationFor(postsForTag, tagToShow)))
    } else {
      res.sendStatus(404)
    }
  })
  app.get('/blog/tag/:tag/feed.atom', function (req, res) {
    const tagToShow = req.params.tag
    let postsForTag = posts.filter(post => _(post.tags).includes(tagToShow))
    if (postsForTag.length > 0) {
      res.send(Feed.generateAtomFrom(tagFeedConfigurationFor(postsForTag, tagToShow)))
    } else {
      res.sendStatus(404)
    }
  })
  app.get('/blog/tag/:tag/feed.rss', function (req, res) {
    const tagToShow = req.params.tag
    let postsForTag = posts.filter(post => _(post.tags).includes(tagToShow))
    if (postsForTag.length > 0) {
      res.send(Feed.generateRssFrom(tagFeedConfigurationFor(postsForTag, tagToShow)))
    } else {
      res.sendStatus(404)
    }
  })

  app.use(nuxt.render)

  if (nuxtConfig.dev) {
    nuxt.build()
      .catch((error) => {
        // TODO adjust ESLint rules?
        console.error(error) // eslint-disable-line no-console
        process.exit(1)
      })
  }

  return app
}

function generalFeedConfigurationFor (posts) {
  return {
    BASE_URL,
    IMAGES_BASE_URL,
    posts,
    feedTitle: 'Timbercode',
    feedDescription: 'wszystkie wpisy',
    showFuturePosts
  }
}

function tagFeedConfigurationFor (posts, tag) {
  return {
    BASE_URL,
    IMAGES_BASE_URL,
    posts,
    feedTitle: `Timbercode - tag ${tag}`,
    feedDescription: `wpisy otagowane ${tag}`,
    showFuturePosts
  }
}
