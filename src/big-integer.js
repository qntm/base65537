/**
	Highly bizarre, bespoke big-integer implementation. Integers are represented
	as arrays of place values in an integer base of your choice, e.g. 10. The array
	has no leading zeroes. Zero is represented as an empty array. Negative numbers
	are not supported.
	This representation makes the Base65537 calculations more efficient because
	multiplying and dividing by the base is just an array shift operation.
	Operations work IN PLACE but return the modified array as well.
	Some of them, anyway. Who cares.
*/

"use strict";

module.exports = function(n) {
	return {
		increment: function(arr) {
			var i = arr.length - 1;
			while(i >= 0 && arr[i] === n - 1) {
				arr[i] = 0;
				i--;
			}
			if(i >= 0) {
				arr[i]++;
			} else {
				arr.unshift(1);
			}
			return arr;
		},
		add: function(arr1, arr2) {
			var carry = 0;
			var i = 0;
			while(i < arr2.length || carry > 0) {
				var s = (
					(0 <= arr1.length - 1 - i ? arr1[arr1.length - 1 - i] : 0) +
					(0 <= arr2.length - 1 - i ? arr2[arr2.length - 1 - i] : 0) +
					carry
				);
				if(0 <= arr1.length - 1 - i) {
					arr1[arr1.length - 1 - i] = s % n;
				} else {
					arr1.unshift(s % n);
				}
				carry = (s - (s % n)) / n;
				i++;
			}
			return arr1;
		},
		decrement: function(arr) {
			var i = arr.length - 1;
			while(i >= 0 && arr[i] === 0) {
				arr[i] = n - 1;
				i--;
			}
			if(i >= 0) {
				arr[i]--;
			} else {
				throw Error("Can't decrement zero");
			}

			// trim leading zeroes.
			while(arr.length > 0 && arr[0] === 0) {
				arr.shift();
			}
			return arr;
		},
		multiplyX: function(arr, x) {
			var carry = 0;
			var result = [];
			for(var i = 0; i < arr.length; i++) {
				var p = arr[arr.length - 1 - i] * x + carry;
				result.unshift(p % n);
				carry = (p - (p % n)) / n;
			}
			if(carry > 0) {
				result.unshift(carry);
			}

			// trim leading zeroes.
			while(result.length > 0 && result[0] === 0) {
				result.shift();
			}

			return result;
		},
		multiply: function(arr1, arr2) {
			var result = [];
			for(var i = 0; i < arr2.length; i++) {
				var partial = this.multiplyX(arr1, arr2[arr2.length - i - 1]);
				for(var j = 0; j < i; j++) {
					partial.push(0);
				}
				result = this.add(result, partial);
			}

			// trim leading zeroes.
			while(result.length > 0 && result[0] === 0) {
				result.shift();
			}

			return result;
		},
		represent: function(x) {
			var result = [];
			while(x > 0) {
				result.unshift(x % n);
				x = (x - (x % n)) / n;
			}
			return result;
		}
	};
};
