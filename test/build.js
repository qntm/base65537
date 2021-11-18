'use strict'

const build = require('../src/build.js')

const zxcvb = build(['z', 'x', 'c', 'v', 'b'])

console.log('build().encode')
console.log(zxcvb.encode(Buffer.from([])) === '')
console.log(zxcvb.encode(Buffer.from([0])) === 'z')
console.log(zxcvb.encode(Buffer.from([1])) === 'x')
console.log(zxcvb.encode(Buffer.from([4])) === 'b')
console.log(zxcvb.encode(Buffer.from([5])) === 'zz')
console.log(zxcvb.encode(Buffer.from([6])) === 'zx')
console.log(zxcvb.encode(Buffer.from([37, 255, 1])) === 'zzxcxvxzzz')
console.log()

console.log('build().decode')
console.log(zxcvb.decode('').equals(Buffer.from([])))
console.log(zxcvb.decode('z').equals(Buffer.from([0])))
console.log(zxcvb.decode('x').equals(Buffer.from([1])))
console.log(zxcvb.decode('b').equals(Buffer.from([4])))
console.log(zxcvb.decode('zz').equals(Buffer.from([5])))
console.log(zxcvb.decode('zx').equals(Buffer.from([6])))
console.log(zxcvb.decode('zzxcxvxzzz').equals(Buffer.from([37, 255, 1])))
console.log()
