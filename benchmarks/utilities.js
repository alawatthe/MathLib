var exports = {
	randomNumber: function () {
		var r = Math.random();

		if (r < 0.01) {
			return NaN;
		}
		else if (r < 0.02) {
			return -Infinity;
		}
		else if (r < 0.03) {
			return +Infinity;
		}

		return ((r - 0.03) * 2.061855670103093 - 1) * Number.MAX_VALUE;
	}

};

module.exports = exports;
