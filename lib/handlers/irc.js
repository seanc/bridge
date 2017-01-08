const irc = require('irc')
const log = require('../log')('irc')
const broadcast = require('../broadcast')
const config = require('../config')
const format = require('../format')

const IRC = function IRC() {
  this.server = config.irc.host
  this.nick = config.irc.nick
  this.channels = config.irc.channels.split(' ').map(c => `#${c}`)
  this.bot = new irc.Client(this.server, this.nick, { autoConnect: false, channels: this.channels })

  this.bot.addListener('message', (from, to, text, message) => {
    if (from === this.nick) return
    if (!(this.channels.length && this.channels.includes(to))) return
    if (message.command !== 'PRIVMSG' || message.args.length < 2) return

    const sender = from
    const content = text
    const handler = 'irc'

    broadcast.emit('broadcast', { sender, content, handler })
  })

  this.bot.addListener('error', message => log.error(message))

  broadcast.on('broadcast', message => {
    if (message.handler === 'irc') return
    for (let i of this.channels) this.bot.say(i, format(message, true))
  })
}


IRC.prototype.start = function start() {
  this.bot.connect()
  log.info(`connected as ${this.nick}`)
}

module.exports = IRC
