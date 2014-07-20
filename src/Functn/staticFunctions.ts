var args, fn;
for (var fnName in fns) {
	/* istanbul ignore else */
	if (fns.hasOwnProperty(fnName)) {
		fn = (<any>fns)[fnName];

		if ('args' in fn) {
			args = fn.args.map(x => MathLib.Expression.variable(x));
		}
		else if ('arity' in fn) {
			args = ['x', 'y', 'z'].slice(0, fn.arity)
			.map(x => MathLib.Expression.variable(x));
		}
		else {
			args = [MathLib.Expression.variable('x')];
		}

		Object.defineProperty(exports, fnName, {
			value: MathLib.Functn(fns[fnName].functn, {
				name: fnName,
				arity: args.length,
				expression: new MathLib.Expression({
					subtype: 'functionDefinition',
					args: args,
					content: [new MathLib.Expression({
							subtype: 'functionCall',
							content: args,
							value: fnName,
							cdgroup: fn.cdgroup,
							contentMathMLName: fn.contentMathMLName || fnName
						})
					]
				})
			}),
			writable: true,
			enumerable: true,
			configurable: true
		});

		if ('toContentMathML' in fn) {
			exports[fnName].expression.content[0].toContentMathML = (function (fn) {
				return function () {
					var MathML = '<apply>';

					for (var i = 0, ii = fn.toContentMathML.length - 1; i < ii; i++) {
						MathML += fn.toContentMathML[i] + this.content[i].toContentMathML();
					}

					MathML += fn.toContentMathML[i];
					MathML += '</apply>';

					return MathML;
				};
			})(fn);
		}

		if ('toLaTeX' in fn) {
			exports[fnName].expression.content[0].toLaTeX = (function (fn) {
				return function () {
					var LaTeX = '';

					for (var i = 0, ii = fn.toLaTeX.length - 1; i < ii; i++) {
						LaTeX += fn.toLaTeX[i] + this.content[i].toLaTeX();
					}

					LaTeX += fn.toLaTeX[i];

					return LaTeX;
				};
			})(fn);
		}

		if ('toMathML' in fn) {
			exports[fnName].expression.content[0].toMathML = (function (fn) {
				return function () {
					var MathML = '<mrow>';

					for (var i = 0, ii = fn.toMathML.length - 1; i < ii; i++) {
						MathML += fn.toMathML[i] + this.content[i].toMathML();
					}

					MathML += fn.toMathML[i];
					MathML += '</mrow>';

					return MathML;
				};
			})(fn);
		}

		if (fn.hasOwnProperty('toString')) {
			exports[fnName].expression.content[0].toString = (function (fn) {
				return function () {
					var str = '';

					for (var i = 0, ii = fn.toString.length - 1; i < ii; i++) {
						str += fn.toString[i] + this.content[i].toString();
					}

					str += fn.toString[i];

					return str;
				};
			})(fn);
		}

	}
}


export var abs = (<any>exports).abs;
export var arccos = (<any>exports).arccos;
export var arccot = (<any>exports).arccot;
export var arccsc = (<any>exports).arccsc;
export var arcosh = (<any>exports).arcosh;
export var arcoth = (<any>exports).arcoth;
export var arcsch = (<any>exports).arcsch;
export var arcsec = (<any>exports).arcsec;
export var arcsin = (<any>exports).arcsin;
export var arctan = (<any>exports).arctan;
export var arsech = (<any>exports).arsech;
export var arsinh = (<any>exports).arsinh;
export var artanh = (<any>exports).artanh;
export var binomial = (<any>exports).binomial;
export var ceil = (<any>exports).ceil;
export var cbrt = (<any>exports).cbrt;
export var conjugate = (<any>exports).conjugate;
export var copy = (<any>exports).copy;
export var cos = (<any>exports).cos;
export var cosh = (<any>exports).cosh;
export var cot = (<any>exports).cot;
export var coth = (<any>exports).coth;
export var csc = (<any>exports).csc;
export var csch = (<any>exports).csch;
export var degToRad = (<any>exports).degToRad;
export var exp = (<any>exports).exp;
export var factorial = (<any>exports).factorial;
export var floor = (<any>exports).floor;
export var identity = (<any>exports).identity;
export var inverse = (<any>exports).inverse;
export var isFinite = (<any>exports).isFinite;
export var isInt = (<any>exports).isInt;
export var isNaN = (<any>exports).isNaN;
export var isNegZero = (<any>exports).isNegZero;
export var isOne = (<any>exports).isOne;
export var isPosZero = (<any>exports).isPosZero;
export var isPrime = (<any>exports).isPrime;
export var isReal = (<any>exports).isReal;
export var isZero = (<any>exports).isZero;
export var lg = (<any>exports).lg;
export var ln = (<any>exports).ln;
export var logGamma = (<any>exports).logGamma;
export var negative = (<any>exports).negative;
export var not = (<any>exports).not;
export var radToDeg = (<any>exports).radToDeg;
export var rem = (<any>exports).rem;
export var sec = (<any>exports).sec;
export var sech = (<any>exports).sech;
export var sign = (<any>exports).sign;
export var sin = (<any>exports).sin;
export var sinh = (<any>exports).sinh;
export var sqrt = (<any>exports).sqrt;
export var tan = (<any>exports).tan;
export var tanh = (<any>exports).tanh;

export var arctan2 = (<any>exports).arctan2;
export var divide = (<any>exports).divide;
export var equivalent = (<any>exports).equivalent;
export var implies = (<any>exports).implies;
export var log = (<any>exports).log;
export var minus = (<any>exports).minus;
export var mod = (<any>exports).mod;
export var pow = (<any>exports).pow;
export var root = (<any>exports).root;

export var divisors = (<any>exports).divisors;
export var factor = (<any>exports).factor;
export var fallingFactorial = (<any>exports).fallingFactorial;
export var fibonacci = (<any>exports).fibonacci;
export var risingFactorial = (<any>exports).risingFactorial;
export var round = (<any>exports).round;
export var trunc = (<any>exports).trunc;

export var and = (<any>exports).and;
export var arithMean = (<any>exports).arithMean;
export var gcd = (<any>exports).gcd;
export var geoMean = (<any>exports).geoMean;
export var harmonicMean = (<any>exports).harmonicMean;
export var hypot = (<any>exports).hypot;
export var hypot2 = (<any>exports).hypot2;
export var isEqual = (<any>exports).isEqual;
export var lcm = (<any>exports).lcm;
export var max = (<any>exports).max;
export var min = (<any>exports).min;
export var or = (<any>exports).or;
export var plus = (<any>exports).plus;
export var times = (<any>exports).times;
export var xor = (<any>exports).xor;


/*es6
export {abs, arccos, arccot, arccsc, arcosh, arcoth, arcsch, arcsec, arcsin, arctan, arsech, arsinh, artanh, binomial, ceil, cbrt, conjugate, copy, cos, cosh, cot, coth, csc, csch, degToRad, exp, factorial, floor, identity, inverse, isFinite, isInt, isNaN, isNegZero, isOne, isPosZero, isPrime, isReal, isZero, lg, ln, logGamma, negative, not, radToDeg, rem, sec, sech, sign, sin, sinh, sqrt, tan, tanh, arctan2, divide, equivalent, implies, log, minus, mod, pow, root, divisors, factor, fallingFactorial, fibonacci, risingFactorial, round, trunc, and, arithMean, gcd, geoMean, harmonicMean, hypot, hypot2, isEqual, lcm, max, min, or, plus, times, xor};
es6*/
