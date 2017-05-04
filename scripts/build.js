const yargs = require('yargs')
const Nuxt = require('nuxt')
const setEnv = require('./helpers/set-env')

const argv = yargs
  .strict()
  .option('env', {
    type: 'string',
    describe: 'Path to JSON file with environment variables defined.',
    demand: true
  })
  .help()
  .detectLocale(false)
  .argv

const envJsonFilePath = argv['env']
setEnv.fromJson(require(`../${envJsonFilePath}`))

const nuxtConfig = require('../nuxt.config')
const nuxt = new Nuxt(nuxtConfig)
nuxt
  .build()
  .catch((error) => {
    // TODO adjust ESLint rules?
    console.error(error) // eslint-disable-line no-console
    process.exit(1)
  })
