const processor = require('./processor')
const log = require('./log')('processor')

processor(() => log.info('started'))
