var binaryFunctions = {
	arctan2: Math.atan2,
	binomial: function (n, k) {
		// TODO: non integer values
		// What should be done with very big numbers?
		var binomial = 1, i, sign;

		// not finite means ±∞ or NaN
		if (MathLib.isNaN(n) || !MathLib.isFinite(k)) {
			return NaN;
		}

		// Exit early for areas which return 0
		if ( (n >= 0 && k <= -1)
			|| (n >= 0 && k > n)
			|| (k <  0 && k > n)) {
			return 0;
		}

		if (n < 0) {
			if (k < 0) {
				// negative odd number % 2 = -1 and not +1
				// This leads to the + 1 here.
				return ((n + k) % 2 * 2 + 1) * MathLib.binomial(-k - 1, -n - 1);
			}
			else {
				if (k === 0) {
					sign = 1;
				}
				else {
					sign = -(k % 2 * 2 - 1);
				}
				binomial = sign * MathLib.binomial(k - n - 1, k);
			}
		}

		if (k > n / 2) {
			k = n - k;
		}

		for (i = 1; i <= k; i++) {
			binomial *= (n + 1 - i) / i;
		}
		return binomial;
	},
	divide: function (a, b) {
		return MathLib.times(a, MathLib.inverse(b));
	},
	log: function (base, x) {
		if (arguments.length === 1) {
			x = base;
			base = 10;
		}
		return Math.log(x) / Math.log(base);
	},
	minus: function (a, b) {
		return MathLib.plus(a, MathLib.negative(b));
	},
	mod: function (n, m) {
		var nm = n % m;
		return nm >= 0 ? nm : nm + m;
	},
	pow: function (x, y) {
		if (x === 1 || (x === -1 && (y === Infinity || y === -Infinity))) {
			return 1;
		}
		return Math.pow(x, y);
	},
	root: function (x, root) {
		if (arguments.length === 1) {
			return Math.sqrt(x);
		}
		return Math.pow(x, 1 / root);
	},
};


var createBinaryFunction = function (f, name) {
	return function (x) {
		if (typeof x === 'number') {
			return f.apply('', arguments);
		}
		else if (typeof x === 'function') {
			return function (y) {return f(x(y));};
		}
		else if (x.type === 'set') {
			return new MathLib.Set( x.map(f) );
		}
		else if (x.type === 'complex') {
			return x[name].apply(x, Array.prototype.slice.call(arguments, 1));
		}
		else if (Array.isArray(x)) {
			return x.map(f);
		}
		else {
			return x[name]();
		}
	};
};


var func, cur;
for (func in binaryFunctions) {
	if (binaryFunctions.hasOwnProperty(func)) {

		cur = binaryFunctions[func];
		Object.defineProperty(exports, func, {
			value: createBinaryFunction(binaryFunctions[func], func)
		});
	}
}