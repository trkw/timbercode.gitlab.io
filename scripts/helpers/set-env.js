module.exports = {
  fromJson
}

function fromJson (envJson) {
  Object.keys(envJson).forEach(key => {
    const value = envJson[key]
    const type = typeof value
    if (value === null || type === 'boolean' || type === 'number' || type === 'string') {
      process.env[key] = value
      return
    }
    console.error(
      `'${key}' cannot be set as environment variable, because it's not primitive. ` +
      `It's type is '${type}'.`
    )
    process.exit(1)
  })
}
