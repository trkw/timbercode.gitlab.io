'use strict'

// TODO ???
process.env.DEBUG = 'nuxt:*'

module.exports = TimbercodeWebsite

function TimbercodeWebsite () {
  const express = require('express')
  const Nuxt = require('nuxt')
  const nuxtConfig = require('../../nuxt.config.js')
  nuxtConfig.dev = !(process.env.NODE_ENV === 'production')

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
