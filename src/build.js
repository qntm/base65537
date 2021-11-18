const repertoire = require('./repertoire.js')

const byteRange = Math.pow(2, 8)

// `digits` should be an array of integers from [0, base)
// `base` should be an integer
const digitsToBigInt = (digits, base) =>
  digits.reduce((acc, digit) => acc * BigInt(base) + BigInt(digit) + 1n, 0n)

// `base` should be an integer
const bigIntToDigits = (bigInt, base) => {
  const digits = []
  while (bigInt > 0n) {
    bigInt -= 1n
    digits.push(Number(bigInt % BigInt(base)))
    bigInt /= BigInt(base) // rounds down
  }
  digits.reverse()
  return digits
}

module.exports = function (chrs) {
  const rep = repertoire(chrs)
  const repRange = chrs.length

  return {
    encode: function (buf) {
      return rep.values2str(
        bigIntToDigits(
          digitsToBigInt(
            [...buf.values()],
            byteRange
          ),
          repRange
        )
      )
    },
    decode: function (str) {
      return Buffer.from(
        bigIntToDigits(
          digitsToBigInt(
            rep.str2values(str),
            repRange
          ),
          byteRange
        )
      )
    }
  }
}
