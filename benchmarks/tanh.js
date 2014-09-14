/* jshint node: true */

var randomNumber = require('./utilities').randomNumber;
var MathLib = require('../build/commonjs/MathLib');

var not_cached = function (x) {

	if (x === 0 || !MathLib.isFinite(x)) {
		return MathLib.sign(x);
	}

	return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
};

var both_with_exp = function (x) {
	var n, p;

	if (x === 0 || !MathLib.isFinite(x)) {
		return MathLib.sign(x);
	}

	p = Math.exp(x);
	n = Math.exp(-x);
	return (p - n) / (p + n);
};

var one_with_inverse = function (x) {
	var n, p;

	if (x === 0 || !MathLib.isFinite(x)) {
		return MathLib.sign(x);
	}

	p = Math.exp(x);
	n = 1 / p;
	return (p - n) / (p + n);
};

var inlined_inverse = function (x) {
	var p;

	if (x === 0 || !MathLib.isFinite(x)) {
		return MathLib.sign(x);
	}

	p = Math.exp(x);
	return (p - 1 / p) / (p + 1 / p);
};

var inlined_squares = function (x) {
	var p;

	if (x === 0 || !MathLib.isFinite(x)) {
		return MathLib.sign(x);
	}

	p = Math.exp(x);
	return (p * p - 1) / (p * p + 1);
};

var cachedSquares = function (x) {
	var p, p2;

	if (x === 0 || !MathLib.isFinite(x)) {
		return MathLib.sign(x);
	}

	p = Math.exp(x);
	p2 = p * p;

	return (p2 - 1) / (p2 + 1);
};


var expOfDouble = function (x) {
	var p;

	if (x === 0 || !MathLib.isFinite(x)) {
		return MathLib.sign(x);
	}

	p = Math.exp(2 * x);

	return (p - 1) / (p + 1);
};


var expOfDouble2 = function (x) {
	var p;

	if (x === 0 || !MathLib.isFinite(x)) {
		return MathLib.sign(x);
	}

	p = Math.exp(2 * x);

	return 1 - 2 / (p - 1);
};



var variations = [
		{
			name: 'not cached',
			fn: function () {
				return not_cached(randomNumber());
			}
		},
		{
			name: 'both with exp',
			fn: function () {
				return both_with_exp(randomNumber());
			}
		},
		{
			name: 'one with inverse',
			fn: function () {
				return one_with_inverse(randomNumber());
			}
		},
		{
			name: 'inlined inverse',
			fn: function () {
				return inlined_inverse(randomNumber());
			}
		},
		{
			implemented: true,
			name: 'inlined squares',
			fn: function () {
				return inlined_squares(randomNumber());
			}
		},
		{
			name: 'cached squares',
			fn: function () {
				return cachedSquares(randomNumber());
			}
		},
		{
			name: 'exp(2*x)',
			fn: function () {
				return expOfDouble(randomNumber());
			}
		},
		{
			name: 'exp(2*x) ver. 2',
			fn: function () {
				return expOfDouble2(randomNumber());
			}
		}
	];


if ('tanh' in Math) {
	variations.push({
		name: 'native',
		fn: function () {
			return Math.tanh(randomNumber());
		}
	});
}

module.exports = {
	name: 'tanh',
	variations: variations
};
