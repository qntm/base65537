"use strict";

module.exports = {
	values2buffer: function(values) {
		return Buffer.from(values);
	},
	buffer2values: function(buffer) {
		return [...buffer.values()];
	}
};
