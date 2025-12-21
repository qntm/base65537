/* eslint-env mocha */

import assert from 'assert'
import fs from 'fs'
import { encode, decode } from '../src/index.js'

const uint8ArrayFromHex = hex => Uint8Array.from(hex.match(/../g).map(xx => Number.parseInt(xx, 16)))

// md5("")
const md5 = Uint8Array.from([0xd4, 0x1d, 0x8c, 0xd9, 0x8f, 0x00, 0xb2, 0x04, 0xe9, 0x80, 0x09, 0x98, 0xec, 0xf8, 0xf1, 0x1f])

describe('base65537', () => {
  describe('encode', () => {
    it('works', () => {
      assert.deepStrictEqual(encode(Uint8Array.from([])), '')
      assert.deepStrictEqual(encode(Uint8Array.from([0])), '㐀')
    })
  })

  describe('decode', () => {
    it('works', () => {
      assert.deepStrictEqual(decode(''), Uint8Array.from([]))
      assert.deepStrictEqual(decode('㐀'), Uint8Array.from([0]))
      assert.deepStrictEqual(decode('💩'), Uint8Array.from([255, 0]))
      assert.deepStrictEqual(decode('💩💩'), Uint8Array.from([255, 1, 255, 1]))
      assert.deepStrictEqual(
        decode('💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩'),
        uint8ArrayFromHex('ff15fffc05ea219682718955bcab7a5577367415a0a1a09e740d772c7a4cbca589528270219605e9fffbff15')
      )
      assert.deepStrictEqual(
        decode('💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩'),
        uint8ArrayFromHex('ff8c2593fa4dd670941e2619c02e0c2e1ac551a18ab8d1ae7ca7ede9f3b6aac3667d3ca3f1d22db07ed364308d64c673e9137ea4c4f04be24148e7ccc68a4310dbddaa20c30d7217f1816713fede93255c5116f4fb4f219c3b7d632057d93c9d561a982d0aa80a1caa98d0f5057edf0f37f3e49d997ded1814d1b43a42685c1e87f13269fd1d27f65130c13cb064074c5dff9cbdfa6f6d037a1d4672301577791767c8eae198d9650e11f3cd076b3d4119ca05d68d2b9defb9e9fd3425f74a3a25eecd38a4b4af1b35f4613c15793ecf7284426e3dba861574c3fe1719247f40281d918a36c81b18bd826e553cf957df3a4cb5e5ac59bb896b13ce7dc6da2e92e8296086d14abd73d9dde17f3d374cd6bcb0f95d258cff8b')
      )
    })

    it('fails', () => {
      assert.throws(() => decode('abc'), Error('Can\'t decode character a'))
    })
  })

  describe('demo', () => {
    it('works', () => {
      assert.deepStrictEqual(encode(md5), '䯕傺檸𥴏髌𡎱𦸜💩')
      assert.deepStrictEqual(decode('䯕傺檸𥴏髌𡎱𦸜💩'), md5)
    })
  })

  describe('round trips', () => {
    const uint8Arrays = [
      md5,
      uint8ArrayFromHex('8eb44f6c-2505-4446-aa57-22d6897c9922'.replace(/-/g, '')),
      uint8ArrayFromHex('2001:0db8:85a3:0000:8a2e:0370:7334'.replace(/:/g, '')),
      uint8ArrayFromHex(fs.readFileSync('./test/sample-files/everyByte', 'hex')) // takes a while, be patient!
      // fs.readFileSync("./test/sample-files/everyPairOfBytes"), // takes ages
      // fs.readFileSync("./test/sample-files/lena_std.tif") // takes many ages
    ]
    uint8Arrays.forEach((uint8Array, i) => {
      it(`case #${i}`, () => {
        assert.deepStrictEqual(decode(encode(uint8Array)), uint8Array)
      })
    })
  })
})
