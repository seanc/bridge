module.exports = scope => require('catlog')(`bridge:${scope ? scope : 'main'} `)
