/**
  Only used during tests.
*/

'use strict'

if (Array.prototype.equals) {
  throw Error('Array.prototype.equals already exists')
}

Array.prototype.equals = function (that) {
  if (!Array.isArray(that)) {
    return false
  }
  if (this.length !== that.length) {
    return false
  }
  for (let i = 0; i < this.length; i++) {
    if (this[i] !== that[i]) {
      return false
    }
  }
  return true
}
