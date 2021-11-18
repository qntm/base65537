/**
  Horribly inefficient procedures for converting a sequence of values into
  a single huge number representing the index of that sequence in the
  infinite sequence of all possible sequences, arranged by length and then
  lexicographically. Yes.
  A big integer, that is.
*/

const bigInteger = require('./big-integer.js')

module.exports = function (n) {
  const bigN = bigInteger(n)
  return {
    values2lexi: function (values) {
      const lexi = []
      for (let i = 0; i < values.length; i++) {
        const value = values[i]
        if (value < 0 || n <= value) {
          throw Error('Value out of range')
        }
        lexi.push(0)
        bigN.add(lexi, [value])
        bigN.increment(lexi)
      }
      return lexi
    },

    lexi2values: function (lexi) {
      const values = []
      while (lexi.length > 0) {
        bigN.decrement(lexi)
        const value = lexi.length > 0 ? lexi.pop() : 0
        if (value < 0 || n <= value) {
          throw Error('Value out of range')
        }
        values.unshift(value)
      }
      return values
    }
  }
}
