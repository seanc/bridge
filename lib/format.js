module.exports = function format(message, includeHandler) {
  return `${includeHandler ? `[${message.handler}]` : ''} [${message.sender}] ${message.content}`
}
