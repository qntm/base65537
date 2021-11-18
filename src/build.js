const byteRange = BigInt(Math.pow(2, 8))

// `digits` should be an array of integers from [0, base)
// `base` should be a BigInt
const digitsToBigInt = (digits, base) =>
  digits.reduce((acc, digit) => acc * base + BigInt(digit) + 1n, 0n)

// `base` should be a BigInt
const bigIntToDigits = (bigInt, base) => {
  const digits = []
  while (bigInt > 0n) {
    bigInt -= 1n
    digits.push(Number(bigInt % base))
    bigInt /= base // rounds down
  }
  digits.reverse()
  return digits
}

module.exports = function (str) {
  const chrs = [...str]
  const unchrs = Object.fromEntries(Object.entries(chrs).map(([key, value]) => [value, key]))

  const repRange = BigInt(chrs.length)

  return {
    encode: function (buf) {
      return bigIntToDigits(
        digitsToBigInt(
          [...buf.values()],
          byteRange
        ),
        repRange
      )
        .map(digit => {
          if (!(digit in chrs)) {
            throw Error(`Can't convert digit ${digit} to chr`)
          }
          return chrs[digit]
        })
        .join('')
    },
    decode: function (str) {
      return Buffer.from(
        bigIntToDigits(
          digitsToBigInt(
            [...str].map(chr => {
              if (!(chr in unchrs)) {
                throw Error(`Can't convert character ${chr} to digit`)
              }
              return unchrs[chr]
            }),
            repRange
          ),
          byteRange
        )
      )
    }
  }
}
