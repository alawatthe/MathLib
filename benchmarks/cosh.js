/* jshint node: true */

var randomNumber = require('./utilities').randomNumber;

var cached = function (x) {
	var ex = Math.exp(x);
	return (ex + 1 / ex) / 2;
};

var naive = function (x) {
	return (Math.exp(x) + Math.exp(-x)) / 2;
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


if ('cosh' in Math) {
	variations.push({
		name: 'native',
		fn: function () {
			return Math.cosh(randomNumber());
		}
	});
}

module.exports = {
	name: 'cosh',
	variations: variations
};
