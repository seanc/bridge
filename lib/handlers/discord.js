const { Client } = require('discord.js')
const log = require('../log')('discord')
const broadcast = require('../broadcast')
const config = require('../config')
const format = require('../format')
const noop = require('noop4')

const Discord = function Discord() {
  this.bot = new Client()
  this.bot.on('ready', () => log.info(`connected as ${this.bot.user.username}`))

  this.guilds = config.discord.guilds.split(' ')
  this.channels = config.discord.channels.split(' ')

  this.bot.on('message', message => {
    if (message.author.id === this.bot.user.id) return
    if (!(this.guilds.length && this.guilds.includes(message.guild.id))) return
    if (!(this.channels.length && this.channels.includes(message.channel.name))) return

    const sender = message.author.username
    const content = message.content
    const handler = 'discord'

    broadcast.emit('broadcast', { sender, content, handler })
  })

  broadcast.on('broadcast', message => {
    if (message.handler === 'discord') return

    this.bot.guilds.filter(guild => {
      return this.guilds.includes(guild.id) || !this.guilds.length
    }).map(guild => {
      guild.channels.filter(channel => {
        return this.channels.includes(channel.name) || !this.channels.length
      }).map(channel => channel.sendMessage(format(message)))
    })
  })

}

Discord.prototype.start = function start(cb) {
  cb = cb || noop()
  this.bot.login(config.discord.token).then(cb)
}

module.exports = Discord
