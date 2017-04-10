'use strict'

const TimbercodeWebsite = require('./timbercode-website')

const app = TimbercodeWebsite()

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
