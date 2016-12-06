const broadcast = require('./broadcast')
const noop = require('noop4')

const Skype = require('./handlers/skype')
const Discord = require('./handlers/discord')

const skype = new Skype()
const discord = new Discord()

function start(cb) {
  cb = cb || noop()

  skype.start()
  discord.start()

  cb()
}

module.exports = start
