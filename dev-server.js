'use strict'

const TimbercodeWebsite = require('./timbercode-website/server')

const app = TimbercodeWebsite()

app.listen(3000, function () {
  console.log('TimbercodeWebsite listening on port 3000!')
})
