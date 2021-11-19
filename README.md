# base65537

No, YOU shut up!

Base65537 is a binary encoding optimised for UTF-32-encoded text and Twitter. It is one better than [Base65536](https://github.com/ferno/base65536).

The output makes the most efficient possible usage of the 65,537-character repertoire available to it, outputting a string whose length is, on average, the minimum necessary to express all of the input binary data. Notably, no padding characters are needed or used.

## Installation

```bash
npm install base65537
```

## Usage

```js
import { encode, decode } from 'base65537'

const buf = Uint8Array.from([
  0xd4, 0x1d, 0x8c, 0xd9, 0x8f, 0x00, 0xb2, 0x04,
  0xe9, 0x80, 0x09, 0x98, 0xec, 0xf8, 0xf1, 0x1f
])

const str = encode(buf)
console.log(str) // "䯕傺檸𥴏髌𡎱𦸜💩"

const buf2 = decode(str)
console.log(buf.equals(buf2)) // true
```

## How does it work?

A Node.js `Buffer` object is a string over a 256-character alphabet of bytes. Strings over any alphabet can be enumerated by placing them in order of length and then sorting strings of equal length lexicographically. So:

* `Buffer.from([])` ↔ 0
* `Buffer.from([0])` ↔ 1
* `Buffer.from([1])` ↔ 2
* ...
* `Buffer.from([255])` ↔ 256
* `Buffer.from([0, 0])` ↔ 257
* `Buffer.from([0, 1])` ↔ 258
* etc.

For the Base65537 encoding we use an encoding alphabet of 65,537 Unicode characters. These characters have all the same attributes as those used for Base65536; no whitespace, no control characters, immune to Unicode normalization procedures, and generally completely inert and safe to transmit through any "Unicode-clean" text interface. Applying the same enumeration:

* `""` ↔ 0
* `"㐀"` ↔ 1
* `"㔀"` ↔ 2
* ...
* `"💩"` ↔ 65537
* `"㐀㐀"` ↔ 65538
* `"㐀㔀"` ↔ 65539
* etc.

`base65537` encodes a buffer by converting it to a single number as above, then converting the number to a string. Decoding is accomplished by reversing this process. Simple!

## How does Base65537 compare with Base65536?

Horribly. The conversion described above takes O(*n*<sup>2</sup>) time in the length of the input, because I couldn't figure out a faster way to do that base conversion. Even apart from this, the code is mostly appalling. Plus, it's like 200 kilobytes!

Furthermore, Base65536 uses 256 padding characters for a total repertoire of 65,792, whereas Base65537 uses strictly 65,537 characters, making it less efficient in terms of space usage as well. In particular, the "largest" buffer which Base65537 can store in a 140-character Tweet is the 280-byte buffer [0xFF, 0x8C, 0x25, ... 0x8B], which encodes to "💩💩💩...💩" (140 poops long). So, unlike Base65536, Base65537 cannot store all possible 280-byte buffers in a Tweet, only most of them.

These shortcomings are expected to be fixed in Base65538.
