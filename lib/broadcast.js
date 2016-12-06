const { EventEmitter } = require('events')
const broadcast = new EventEmitter()
const format = require('./format')
const log = require('./log')('broadcast')

broadcast.on('broadcast', message => log.info(format(message, true)))

module.exports = broadcast
