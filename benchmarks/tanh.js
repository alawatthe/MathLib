/* jshint node: true */

var randomNumber = require('./utilities').randomNumber;
var MathLib = require('../build/commonjs/MathLib');

var notCached = function (x) {
	if (x === 0 || !MathLib.isFinite(x)) {
		return MathLib.sign(x);
	}

	return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
};

var bothWithExp = function (x) {
	var n, p;

	if (x === 0 || !MathLib.isFinite(x)) {
		return MathLib.sign(x);
	}

	p = Math.exp(x);
	n = Math.exp(-x);
	return (p - n) / (p + n);
};

var oneWithInverse = function (x) {
	var n, p;

	if (x === 0 || !MathLib.isFinite(x)) {
		return MathLib.sign(x);
	}

	p = Math.exp(x);
	n = 1 / p;
	return (p - n) / (p + n);
};

var inlinedInverse = function (x) {
	var p;

	if (x === 0 || !MathLib.isFinite(x)) {
		return MathLib.sign(x);
	}

	p = Math.exp(x);
	return (p - 1 / p) / (p + 1 / p);
};

var inlinedSquares = function (x) {
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
				return notCached(randomNumber());
			}
		},
		{
			name: 'both with exp',
			fn: function () {
				return bothWithExp(randomNumber());
			}
		},
		{
			name: 'one with inverse',
			fn: function () {
				return oneWithInverse(randomNumber());
			}
		},
		{
			name: 'inlined inverse',
			fn: function () {
				return inlinedInverse(randomNumber());
			}
		},
		{
			implemented: true,
			name: 'inlined squares',
			fn: function () {
				return inlinedSquares(randomNumber());
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
