"use strict";

require("./pipe.js");
var lexi = require("./lexi.js");
var bigInteger = require("./big-integer.js");
var buffer = require("./buffer.js");
var conv = require("./conv.js");
var repertoire = require("./repertoire.js");

var byteRange = Math.pow(2, 8);
var lexiB = lexi(byteRange);
var bigB = bigInteger(byteRange);

module.exports = function(chrs) {
	var rep = repertoire(chrs);
	var repRange = chrs.length;
	var lexiC = lexi(repRange);
	var bigC = bigInteger(repRange);

	var bc = conv(byteRange, repRange);
	var cb = conv(repRange, byteRange);

	return {
		encode: function(buf) {
			return buf
				.pipe(buffer.buffer2values)
				.pipe(lexiB.values2lexi)
				.pipe(bc)
				.pipe(lexiC.lexi2values)
				.pipe(rep.values2str);
		},
		decode: function(str) {
			return str
				.pipe(rep.str2values)
				.pipe(lexiC.values2lexi)
				.pipe(cb)
				.pipe(lexiB.lexi2values)
				.pipe(buffer.values2buffer);
		}
	};
};
