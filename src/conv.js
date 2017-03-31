/**
	Convert a big integer from representation in one
	base to representation in another.
	This is O(n^2) time in the length of the input
	array, but who cares, you should not be using
	this for anything but tweets >:)
*/

"use strict";

var bigInteger = require("./big-integer.js");

module.exports = function(m, n) {
	var bigN = bigInteger(n);
	var bigM = bigN.represent(m);
	return function conv(arr) {
		var result = [];
		while(arr.length > 0) {
			result = bigN.multiply(result, bigM);
			var v = arr.shift();
			result = bigN.add(result, bigN.represent(v));
		}
		return result;
	};
};
