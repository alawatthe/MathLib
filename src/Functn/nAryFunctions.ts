// Functions that act on set-like structures and return one single number/boolean...
var nAryFunctions = {
	/**
	 * Returns true iff all arguments are true.
	 *
	 * @param {...boolean} args - Expects an arbitrary number of boolean arguments  
	 * @return {boolean}
	 */
	and: function (args) {
		return args.every(function (x) {
			return !!x;
		});
	},
	arithMean: function (n) {
		return MathLib.plus(n) / n.length;
	},
	gcd: function (a) {
		var min,
				reduction = function (x) {
					return x !== min ? x % min : x;
				},
				isntZero = function (x) {
					return x !== 0;
				};

		// remove zeros and make negative values positive
		a = a.filter(isntZero).map(Math.abs);

		if (a.length === 0) {
			return 0;
		}

		while (a.length > 1) {
			min = MathLib.min(a);
			a = a.map(reduction).filter(isntZero);
		}
		return a[0] || min;
	},
	geoMean: function (n) {
		return MathLib.root(MathLib.times(n), n.length);
	},
	harmonicMean: function (n) {
		return n.length / MathLib.plus(n.map(entry => MathLib.inverse(entry)));
	},
	hypot: function (n) {
		var a, b, max, min;

		if (n.length === 1) {
			return Math.abs(n[0]);
		}

		if (n.length > 2) {
			return n.reduce((a, b) => MathLib.hypot(a, b));
		}

		a = MathLib.abs(n[0]);
		b = MathLib.abs(n[1]);

		// Return Infinity if one value is infinite, even if the other value is NaN.
		// (see IEEE 754-2008, 9.2.1)
		if (a === Infinity || b === Infinity) {
			return Infinity;
		}

		// Return +0 if both values are ±0 (see IEEE 754-2008, 9.2.1)
		if (a === 0 && b === 0) {
			return 0;
		}

		max = Math.max(a, b);
		min = Math.min(a, b);

		return max * Math.sqrt(1 + Math.pow(min / max, 2));
	},
	hypot2: function (n) {
		// Return Infinity if one value is infinite
		if (n.some(function (x) {
			return x === Infinity || x === -Infinity;
		})) {
			return Infinity;
		}
		return n.reduce(function (old, cur) {
			return old + cur * cur;
		}, 0);
	},
	/**
	 * ### MathLib.isEqual()
	 * Determines if all arguments are equal.
	 *
	 * @param {...number|MathLib object} n Expects an arbitrary number of numbers or MathLib objects  
	 * @return {boolean}
	 */
	isEqual: function (n) {
		return n.every(function (a, i, args) {
			if (a === args[0]) {
				return true;
			}
			else if (typeof a === 'number' && typeof args[0] === 'number') {
				return Math.abs(a - args[0]) <= 3e-15;
			}
			else if (typeof a === 'object') {
				return a.isEqual(args[0]);
			}
			else if (typeof args[0] === 'object') {
				return args[0].isEqual(a);
			}
			return false;
		});
	},
	lcm: function (n) {
		if (n.length === 0) {
			return 0;
		}
		if (n.length === 1) {
			return n[0];
		}
		else if (n.length === 2) {
			return MathLib.times(n) / MathLib.gcd(n);
		}
		else if (n.length > 2) {
			return n.reduce((x, y) => MathLib.lcm(x, y));
		}
	},
	max: function (n) {
		return Math.max.apply(null, n);
	},
	min: function (n) {
		return Math.min.apply(null, n);
	},
	/**
	 * ### MathLib.or()
	 * Returns true iff at least one argument is true.
	 *
	 * @param {...boolean} args - Expects an arbitrary number of boolean arguments  
	 * @return {boolean}
	 */
	or: function (args) {
		return args.some(function (x) {
			return !!x;
		});
	},
	plus: function (n) {
		if (n.length === 0) {
			return 0;
		}
		return n.reduce(function (a, b) {
			var f1, f2, aExpr, bExpr;
			if (typeof a === 'number' && typeof b === 'number') {
				return a + b;
			}
			else if (a.type === 'functn' || b.type === 'functn') {
				f1 = a;
				f2 = b;
				aExpr = a.expression ? a.expression.content[0] : {};
				bExpr = b.expression ? b.expression.content[0] : {};

				if (a.type !== 'functn') {
					f1 = function () {
						return a;
					};
					aExpr = new MathLib.Expression({
						value: a,
						subtype: 'number'
					});
				}
				else if (b.type !== 'functn') {
					f2 = function () {
						return b;
					};
					bExpr = new MathLib.Expression({
						value: b,
						subtype: 'number'
					});
				}
				return MathLib.Functn(function (x) {
					return MathLib.plus(f1(x), f2(x));
				}, {
					expression: new MathLib.Expression({
						subtype: 'functionDefinition',
						args: ['x'],
						content: [new MathLib.Expression({
								content: [aExpr, bExpr],
								subtype: 'naryOperator',
								value: '+',
								name: 'plus'
							})
						]
					})
				});
			}
			else if (typeof a === 'object') {
				return a.plus(b);
			}
			// We're assuming that the operations are commutative
			else if (typeof b === 'object') {
				return b.plus(a);
			}
		});
	},
	times: function (n) {
		if (n.length === 0) {
			return 1;
		}
		return n.reduce(function (a, b) {
			var f1, f2, aExpr, bExpr;
			if (typeof a === 'number' && typeof b === 'number') {
				return a * b;
			}
			else if (a.type === 'functn' || b.type === 'functn') {
				f1 = a;
				f2 = b;
				aExpr = a.expression ? a.expression.content[0] : {};
				bExpr = b.expression ? b.expression.content[0] : {};

				if (a.type !== 'functn') {
					f1 = function () {
						return a;
					};
					aExpr = new MathLib.Expression({
						value: a,
						subtype: 'number'
					});
				}
				else if (b.type !== 'functn') {
					f2 = function () {
						return b;
					};
					bExpr = new MathLib.Expression({
						value: b,
						subtype: 'number'
					});
				}
				return MathLib.Functn(function (x) {
					return MathLib.times(f1(x), f2(x));
				}, {
					expression: new MathLib.Expression({
						subtype: 'functionDefinition',
						args: ['x'],
						content: [new MathLib.Expression({
								content: [aExpr, bExpr],
								subtype: 'naryOperator',
								value: '*',
								name: 'times'
							})
						]
					})
				});
			}
			else if (typeof a === 'object') {
				return a.times(b);
			}
			// We're assuming that the operations are commutative
			else if (typeof b === 'object') {
				return b.times(a);
			}
		});
	},
	/**
	 * ### MathLib.xor()
	 * Returns true iff an odd number of the arguments is true.
	 *
	 * @param {...boolean} args - Expects an arbitrary number of boolean arguments  
	 * @return {boolean}
	 */
	xor: function (args) {
		return args.reduce(function (x, y) {
			return x + !!y;
		}, 0) % 2 !== 0;
	}
};


var createNaryFunction = function (f) {
	return function (n) {
		if (MathLib.type(n) === 'set') {
			return f(n.slice());
		}
		else if (MathLib.type(n) !== 'array') {
			n = Array.prototype.slice.apply(arguments);
		}
		return f(n);
	};
};


for (func in nAryFunctions) {
	/* istanbul ignore else */
	if (nAryFunctions.hasOwnProperty(func)) {
		Object.defineProperty(exports, func, {
			value: createNaryFunction(nAryFunctions[func])
		});
	}
}