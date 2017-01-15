const rc = require('rc')
const config = rc('bridge', {
  skype: {
    username: '',
    password: '',
    conversationId: ''
  },
  irc: {
    host: '',
    nick: 'nickname',
    channels: []
  },
  discord: {
    token: '',
    guilds: [],
    channels: ['general'],
    webhook: ''
  }
})

module.exports = config
