/**
  Why am I even bothering to unit-test this?
*/

'use strict'

require('../src/eq-array.js')
const buffer = require('../src/buffer.js')

const nasty = [255, 140, 37, 147, 250, 77, 214, 112, 148, 30, 38, 25, 192, 46, 12, 46, 26, 197, 81, 161, 138, 184, 209, 174, 124, 167, 237, 233, 243, 182, 170, 195, 102, 125, 60, 163, 241, 210, 45, 176, 126, 211, 100, 48, 141, 100, 198, 115, 233, 19, 126, 164, 196, 240, 75, 226, 65, 72, 231, 204, 198, 138, 67, 16, 219, 221, 170, 32, 195, 13, 114, 23, 241, 129, 103, 19, 254, 222, 147, 37, 92, 81, 22, 244, 251, 79, 33, 156, 59, 125, 99, 32, 87, 217, 60, 157, 86, 26, 152, 45, 10, 168, 10, 28, 170, 152, 208, 245, 5, 126, 223, 15, 55, 243, 228, 157, 153, 125, 237, 24, 20, 209, 180, 58, 66, 104, 92, 30, 135, 241, 50, 105, 253, 29, 39, 246, 81, 48, 193, 60, 176, 100, 7, 76, 93, 255, 156, 189, 250, 111, 109, 3, 122, 29, 70, 114, 48, 21, 119, 121, 23, 103, 200, 234, 225, 152, 217, 101, 14, 17, 243, 205, 7, 107, 61, 65, 25, 202, 5, 214, 141, 43, 157, 239, 185, 233, 253, 52, 37, 247, 74, 58, 37, 238, 205, 56, 164, 180, 175, 27, 53, 244, 97, 60, 21, 121, 62, 207, 114, 132, 66, 110, 61, 186, 134, 21, 116, 195, 254, 23, 25, 36, 127, 64, 40, 29, 145, 138, 54, 200, 27, 24, 189, 130, 110, 85, 60, 249, 87, 223, 58, 76, 181, 229, 172, 89, 187, 137, 107, 19, 206, 125, 198, 218, 46, 146, 232, 41, 96, 134, 209, 74, 189, 115, 217, 221, 225, 127, 61, 55, 76, 214, 188, 176, 249, 93, 37, 140, 255, 139]

console.log(buffer.values2buffer([4, 5, 6]).equals(Buffer.from([4, 5, 6])))
console.log(buffer.buffer2values(Buffer.from([4, 5, 6])).equals([4, 5, 6]))

console.log(buffer.values2buffer(nasty).equals(Buffer.from(nasty)))
console.log(buffer.buffer2values(Buffer.from(nasty)).equals(nasty))
