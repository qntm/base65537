const lexi = require('./lexi.js')
const buffer = require('./buffer.js')
const conv = require('./conv.js')
const repertoire = require('./repertoire.js')

const byteRange = Math.pow(2, 8)
const lexiB = lexi(byteRange)

module.exports = function (chrs) {
  const rep = repertoire(chrs)
  const repRange = chrs.length
  const lexiC = lexi(repRange)

  const bc = conv(byteRange, repRange)
  const cb = conv(repRange, byteRange)

  return {
    encode: function (buf) {
      return rep.values2str(lexiC.lexi2values(bc(lexiB.values2lexi(buffer.buffer2values(buf)))))
    },
    decode: function (str) {
      return buffer.values2buffer(lexiB.lexi2values(cb(lexiC.values2lexi(rep.str2values(str)))))
    }
  }
}
