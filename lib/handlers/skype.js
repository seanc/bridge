const Bot = require('skyweb')
const config = require('../config')
const log = require('../log')('skype')
const strip = require('striptags')
const broadcast = require('../broadcast')
// const { EventEmitter } = require('events')
const { inherits } = require('util')
const format = require('../format')
const unescape = require('unescape')

const Skype = function Skype() {
  this.bot = new Bot()
  this.bot.messagesCallback = messages => {
    messages.forEach(message => {
      if (message.resource.from.indexOf(config.skype.username) === -1
      && message.resource.messagetype !== 'Control/Typing'
      && message.resource.messagetype !== 'Control/ClearTyping') {
        const sender = message.resource.from.match(/8\:(.+)/gi)[1] || message.resource.imdisplayname
        const content = unescape(strip(message.resource.content))
        const handler = 'skype'

        broadcast.emit('broadcast', { sender, content, handler })
      }
    })
  }

  broadcast.on('broadcast', message => {
    if (message.handler === 'skype') return
    this.bot.sendMessage(config.skype.conversationId, format(message, true))
  })
}

Skype.prototype.start = function start() {
  this.bot.login(config.skype.username, config.skype.password).then(() => {
    log.info(`connected as ${config.skype.username}`)
  })

  return this.bot
}

// inherits(Skype, EventEmitter)

module.exports = Skype
