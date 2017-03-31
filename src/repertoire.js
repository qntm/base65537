"use strict";

module.exports = function(chrs) {
	var unchrs = {};
	chrs.forEach(function(chr, i) {
		if([...chr].length !== 1) {
			throw Error("Not a single Unicode character: " + chr);
		}
		if(chr in unchrs) {
			throw Error("Duplicate character: " + chr);
		}
		unchrs[chr] = i;
	});

	return {
		values2str: function(values) {
			return values.map(function(value) {
				var chr = chrs[value];
				if(chr === undefined) {
					throw Error("Can't convert value " + value + " to chr");
				}
				return chr;
			}).join("");
		},
		str2values: function(str) {
			return [...str].map(function(chr) {
				var value = unchrs[chr];
				if(value === undefined) {
					throw Error();
				}
				return value;
			});
		}
	};
};
