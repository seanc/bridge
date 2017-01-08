const broadcast = require('./broadcast')
const noop = require('noop4')

const Skype = require('./handlers/skype')
const Discord = require('./handlers/discord')
const IRC = require('./handlers/irc')

const skype = new Skype()
const discord = new Discord()
const irc = new IRC()

function start(cb) {
  cb = cb || noop()

  skype.start()
  discord.start()
  irc.start()

  cb()
}

module.exports = start
