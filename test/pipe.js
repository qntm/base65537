"use strict";

require("../src/pipe.js");

var twice = function(n) {
	return n + n;
};

console.log((56).pipe(twice) === 112);
console.log("abc".pipe(twice) === "abcabc");
console.log();
