/* jshint node: true */

var randomNumber = require('./utilities').randomNumber;

var cached = function (x) {
	var ex;

	// sinh(-0) should be -0
	if (x === 0) {
		return x;
	}

	ex = Math.exp(x);
	return (ex - 1 / ex) / 2;
};

var naive = function (x) {
	// sinh(-0) should be -0
	if (x === 0) {
		return x;
	}
	return (Math.exp(x) - Math.exp(-x)) / 2;
};


var variations = [
		{
			name: 'naive',
			fn: function () {
				return naive(randomNumber());
			}
		},
		{
			implemented: true,
			name: 'cached',
			fn: function () {
				return cached(randomNumber());
			}
		}
	];


if ('sinh' in Math) {
	variations.push({
		name: 'native',
		fn: function () {
			return Math.sinh(randomNumber());
		}
	});
}

module.exports = {
	name: 'sinh',
	variations: variations
};
