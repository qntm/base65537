"use strict";

require("../src/pipe.js");
var base65537 = require("../src/base65537.js");
var repertoire = require("../src/repertoire.js");
var lexi = require("../src/lexi.js");
var conv = require("../src/conv.js");
var buffer = require("../src/buffer.js");
var fs = require("fs");

console.log("base65537.encode()");
console.log(base65537.encode(Buffer.from([])) === "");
console.log(base65537.encode(Buffer.from([0])) === "㐀");
console.log();

console.log("base65537.decode()");
console.log(base65537.decode("").equals(Buffer.from([])));
console.log(base65537.decode("㐀").equals(Buffer.from([0])));
console.log(base65537.decode("💩").equals(Buffer.from([255, 0])));
console.log(base65537.decode("💩💩").equals(Buffer.from([255, 1, 255, 1])));
console.log(base65537.decode("💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩").equals(Buffer.from("ff15fffc05ea219682718955bcab7a5577367415a0a1a09e740d772c7a4cbca589528270219605e9fffbff15", "hex")));
console.log(base65537.decode("💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩").equals(Buffer.from("ff8c2593fa4dd670941e2619c02e0c2e1ac551a18ab8d1ae7ca7ede9f3b6aac3667d3ca3f1d22db07ed364308d64c673e9137ea4c4f04be24148e7ccc68a4310dbddaa20c30d7217f1816713fede93255c5116f4fb4f219c3b7d632057d93c9d561a982d0aa80a1caa98d0f5057edf0f37f3e49d997ded1814d1b43a42685c1e87f13269fd1d27f65130c13cb064074c5dff9cbdfa6f6d037a1d4672301577791767c8eae198d9650e11f3cd076b3d4119ca05d68d2b9defb9e9fd3425f74a3a25eecd38a4b4af1b35f4613c15793ecf7284426e3dba861574c3fe1719247f40281d918a36c81b18bd826e553cf957df3a4cb5e5ac59bb896b13ce7dc6da2e92e8296086d14abd73d9dde17f3d374cd6bcb0f95d258cff8b", "hex")));
console.log();

console.log("demo");
console.log(base65537.encode(new Buffer("d41d8cd98f00b204e9800998ecf8f11f", "hex")) === "䯕傺檸𥴏髌𡎱𦸜💩");
console.log(base65537.decode("䯕傺檸𥴏髌𡎱𦸜💩").equals(new Buffer("d41d8cd98f00b204e9800998ecf8f11f", "hex")));
console.log();

console.log("base65537 round trips");
var buffers = [
	new Buffer("d41d8cd98f00b204e9800998ecf8427e", "hex"), // md5("")
	new Buffer("8eb44f6c-2505-4446-aa57-22d6897c9922".replace(/-/g, ""), "hex"),
	new Buffer("2001:0db8:85a3:0000:8a2e:0370:7334", "hex"),
	fs.readFileSync("./test/sample-files/everyByte"), // takes a while, be patient!
	//fs.readFileSync("./test/sample-files/everyPairOfBytes"), // takes ages
	//fs.readFileSync("./test/sample-files/lena_std.tif") // takes many ages
];
buffers.forEach(function(buffer, i) {
	console.log(buffer.pipe(base65537.encode).pipe(base65537.decode).equals(buffer));
});
console.log();
