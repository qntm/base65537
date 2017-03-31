/**
	Horribly inefficient procedures for converting a sequence of values into
	a single huge number representing the index of that sequence in the
	infinite sequence of all possible sequences, arranged by length and then
	lexicographically. Yes.
	A big integer, that is.
*/

"use strict";

var bigInteger = require("./big-integer.js");

module.exports = function(n) {
	var bigN = bigInteger(n);
	return {
		values2lexi: function(values) {
			var lexi = [];
			for(var i = 0; i < values.length; i++) {
				var value = values[i];
				if(value < 0 || n <= value) {
					throw Error("Value out of range");
				}
				lexi.push(0);
				bigN.add(lexi, [value]);
				bigN.increment(lexi);
			}
			return lexi;
		},

		lexi2values: function(lexi) {
			var values = [];
			while(lexi.length > 0) {
				bigN.decrement(lexi);
				var value = lexi.length > 0 ? lexi.pop() : 0;
				if(value < 0 || n <= value) {
					throw Error("Value out of range");
				}
				values.unshift(value);
			}
			return values;
		}
	};
};
