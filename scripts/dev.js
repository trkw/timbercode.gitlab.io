const nodemon = require('nodemon')
const setEnv = require('./helpers/set-env')

setEnv.fromJson(require('../env/development.json'))

nodemon({
  script: 'dev-server.js'
})

nodemon
  .on('start', () => console.log('dev-server has started'))
  .on('quit', () => console.log('dev-server has quit'))
  .on('restart', (files) => console.log('dev-server restarted due to changes in: ', files))
