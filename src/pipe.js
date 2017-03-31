/**
	A very dumb, low-performance thing to do solely for the
	sake of fractionally neater code but I still like it and
	maybe it'll appear in ES7 as an actual operator
*/

"use strict";

if(Object.prototype.pipe) {
	throw Error("Object.prototype.pipe already exists");
}

Object.prototype.pipe = function(f) {
	return f(this);
};

Object.prototype.pipeT = function(f) {
	var start = new Date().getTime();
	var that = f(this);
	var end = new Date().getTime();
	console.log(f.name, "took", end - start, "milliseconds");
	return that;
};
