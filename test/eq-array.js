"use strict";

require("../src/eq-array.js");

console.log([].equals([]));
console.log([56].equals([56]));
console.log(![56].equals([57]));
console.log(![56].equals([56, 56]));
console.log(![56].equals([]));
console.log(![56, 56].equals([56]));
console.log();
