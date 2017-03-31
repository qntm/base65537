"use strict";

var build = require("../src/build.js");
var base65537 = require("../src/base65537.js");

var zxcvb = build(["z", "x", "c", "v", "b"]);

console.log("build().encode");
console.log(zxcvb.encode(new Buffer([])) === "");
console.log(zxcvb.encode(new Buffer([0])) === "z");
console.log(zxcvb.encode(new Buffer([1])) === "x");
console.log(zxcvb.encode(new Buffer([4])) === "b");
console.log(zxcvb.encode(new Buffer([5])) === "zz");
console.log(zxcvb.encode(new Buffer([6])) === "zx");
console.log(zxcvb.encode(new Buffer([37, 255, 1])) === "zzxcxvxzzz");
console.log();

console.log("build().decode");
console.log(zxcvb.decode("").equals(new Buffer([])));
console.log(zxcvb.decode("z").equals(new Buffer([0])));
console.log(zxcvb.decode("x").equals(new Buffer([1])));
console.log(zxcvb.decode("b").equals(new Buffer([4])));
console.log(zxcvb.decode("zz").equals(new Buffer([5])));
console.log(zxcvb.decode("zx").equals(new Buffer([6])));
console.log(zxcvb.decode("zzxcxvxzzz").equals(new Buffer([37, 255, 1])));
console.log();
