require('./pipe.js')
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
      return buf
        .pipe(buffer.buffer2values)
        .pipe(lexiB.values2lexi)
        .pipe(bc)
        .pipe(lexiC.lexi2values)
        .pipe(rep.values2str)
    },
    decode: function (str) {
      return str
        .pipe(rep.str2values)
        .pipe(lexiC.values2lexi)
        .pipe(cb)
        .pipe(lexiB.lexi2values)
        .pipe(buffer.values2buffer)
    }
  }
}
