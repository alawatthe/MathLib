/* jshint node: true */

var randomNumber = require('./utilities').randomNumber;

var cached = function (x) {
	var ex = Math.exp(x);
	return 2 / (ex + 1 / ex);
};

var naive = function (x) {
	return 2 / (Math.exp(x) + Math.exp(-x));
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


module.exports = {
	name: 'sech',
	variations: variations
};
