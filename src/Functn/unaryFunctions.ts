// ## unary functions
// Some functions for the functn prototype
var unaryFunctions = {
	abs: Math.abs,
	arccos: Math.acos,
	arccot: function (x) {
		return 1.5707963267948966 - Math.atan(x);
	},
	arccsc: function (x) {
		return Math.asin(1 / x);
	},
	arcosh: MathLib.isNative((<any>Math).acosh) || function (x) {
		return Math.log(x + Math.sqrt(x * x - 1));
	},
	arcoth: function (x) {
		// Handle ±∞
		if (!MathLib.isFinite(x)) {
			return 1 / x;
		}
		return 0.5 * Math.log((x + 1) / (x - 1));
	},
	arcsch: function (x) {
		// Handle ±0 and ±∞ separately
		if (x === 0 || !MathLib.isFinite(x)) {
			return 1 / x;
		}
		return Math.log(1 / x + Math.sqrt(1 / (x * x) + 1));
	},
	arcsec: function (x) {
		return Math.acos(1 / x);
	},
	arcsin: Math.asin,
	arctan: Math.atan,
	arsech: function (x) {
		return Math.log((1 + Math.sqrt(1 - x * x)) / x);
	},
	arsinh: MathLib.isNative((<any>Math).asinh) || function (x) {
		// Handle ±0 and ±∞ separately
		if (x === 0 || !MathLib.isFinite(x)) {
			return x;
		}
		return Math.log(x + Math.sqrt(x * x + 1));
	},
	artanh: MathLib.isNative((<any>Math).atanh) || function (x) {
		// Handle ±0
		if (x === 0) {
			return x;
		}
		return 0.5 * Math.log((1 + x) / (1 - x));
	},
	ceil: function (x) {
		// Some implementations have a bug where Math.ceil(-0) = +0 (instead of -0)
		if (x === 0) {
			return x;
		}
		return Math.ceil(x);
	},
	cbrt: function (x) {
		var a3, a3x, an, a;

		// Handle ±0, NaN, ±∞
		if (x === 0 || x !== x || x === Infinity || x === -Infinity) {
			return x;
		}
		
		// Get an approximation
		a = MathLib.sign(x) * Math.pow(Math.abs(x), 1 / 3);

		// Halley's method
		while (true) {
			a3 = Math.pow(a, 3);
			a3x = a3 + x;
			an = a * (a3x + x) / (a3x + a3);
			if (MathLib.isZero(an - a)) {
				break; 
			}
			a = an;
		}
		return an;
	},
	conjugate: function (x) {
		return x;
	},
	copy: function (x) {
		return x;
	},
	cos: Math.cos,
	cosh: MathLib.isNative((<any>Math).cosh) || function (x) {
		return (Math.exp(x) + Math.exp(-x)) / 2;
	},
	cot: function (x) {
		// Handle ±0 separate, because tan(pi/2 ± 0) is not ±∞
		if (x === 0) {
			return 1 / x;
		}
		// cot(x) = tan(pi/2 - x) is better than 1/tan(x)
		return Math.tan(1.5707963267948966 - x);
	},
	coth: function (x) {
		// Handle ±0
		if (x === 0) {
			return 1 / x;
		}

		// Handle ±∞
		if (!MathLib.isFinite(x)) {
			return MathLib.sign(x);
		}

		return (Math.exp(x) + Math.exp(-x)) / (Math.exp(x) - Math.exp(-x));
	},
	csc: function (x) {
		return 1 / Math.sin(x);
	},
	csch: function (x) {
		// csch(-0) should be -∞ not ∞
		if (x === 0) {
			return 1 / x;
		}
		return 2 / (Math.exp(x) - Math.exp(-x));
	},
	degToRad: function (x) {
		// Math.PI / 180 = 0.017453292519943295
		return x * 0.017453292519943295;
	},
	digitsum: function (x) {
		var out = 0;
		while (x > 9) {
			out += x % 10;
			x = Math.floor(x / 10);
		}
		return out + x;
	},
	exp: Math.exp,
	factorial: function (x) {
		var factorial = 1, i;
		if ((x > 170 && MathLib.isInt(x)) || x === Infinity ) {
			return Infinity;
		}
		if (x < 0 || !MathLib.isInt(x) || MathLib.isNaN(x)) {
			return NaN;
		}
		for (i = 1; i <= x; i++) {
			factorial *= i;
		}
		return factorial;
	},
	floor: Math.floor,
	identity: function (x) {
		return x;
	},
	inverse: function (x) {
		return 1 / x;
	},
	isFinite: function (x) {
		return Math.abs(x) < Infinity;
	},
	isInt: function (x) {
		return x % 1 === 0;
	},
	isNaN: function (x) {
		return x !== x;
	},
	isNegZero: function (x) {
		return 1 / x === -Infinity;
	},
	isOne: function (a)    {
		return Math.abs(a - 1) < MathLib.epsilon;
	},
	isPosZero: function (x) {
		return 1 / x === Infinity;
	},
	isPrime: function (x) {
		var sqrt = Math.sqrt(x), i;
		if (x % 1 === 0 && x > 1) {
			if (x === 2) {
				return true;
			}
			if (x % 2 === 0) {
				return false;
			}
			for (i = 3; i <= sqrt; i += 2) {
				if (x % i === 0) {
					return false;
				}
			}
			return true;
		}
		return false;
	},
	isReal: function (x)    {
		return Math.abs(x) < Infinity;
	},
	isZero: function (x) {
		return Math.abs(x) < MathLib.epsilon;
	},
	lg: function (x) {
		return Math.log(x) / Math.LN10;
	},
	ln: Math.log,
	// Algorithm based on [Numerical Recipes Vol. 3, p. 257](www.nr.com)
	logGamma: function (x) {
		var j, tmp, y, ser,
				cof = [57.1562356658629235, -59.5979603554754912, 14.1360979747417471, -0.491913816097620199,
			0.339946499848118887e-4, 0.465236289270485756e-4, -0.983744753048795646e-4, 0.158088703224912494e-3,
			-0.210264441724104883e-3, 0.217439618115212643e-3, -0.164318106536763890e-3, 0.844182239838527433e-4,
			-0.261908384015814087e-4, 0.368991826595316234e-5];

		y = x;
		tmp = x + 5.24218750000000000; // Rational 671/128.
		tmp = (x + 0.5) * Math.log(tmp) - tmp;
		ser = 0.999999999999997092;
		for (j = 0; j < 14; j++) {
			ser += cof[j] / ++y;
		}
		return tmp + Math.log(2.5066282746310005 * ser / x);
	},
	negative: function (x) {
		return -x;
	},
	not: function (x) {
		return !x;
	},
	radToDeg: function (x) {
		// 180 / Math.PI = 57.29577951308232
		return x * 57.29577951308232;
	},
	sec: function (x) {
		return 1 / Math.cos(x);
	},
	sech: function (x) {
		return 2 / (Math.exp(x) + Math.exp(-x));
	},
	sign: function (x) {
		return x && (x < 0 ? -1 : 1);
	},
	sin: Math.sin,
	sinh: MathLib.isNative((<any>Math).sinh) || function (x) {
		// sinh(-0) should be -0
		if (x === 0) {
			return x;
		}
		return (Math.exp(x) - Math.exp(-x)) / 2;
	},
	sqrt: Math.sqrt,
	tan: Math.tan,
	tanh: MathLib.isNative((<any>Math).tanh) || function (x) {
		var p;

		// Handle ±0 and ±∞ separately
		// Their values happen to coincide with sign
		if (x === 0 || !MathLib.isFinite(x)) {
			return MathLib.sign(x);
		}

		p = Math.exp(x);
		return (p * p - 1) / (p * p + 1);
	}
};

	


// Create the unary functions
for (var elemfn in unaryFunctions) {
	if (unaryFunctions.hasOwnProperty(elemfn)) {
		Object.defineProperty(exports, elemfn, {
			value: MathLib.Functn(unaryFunctions[elemfn], {
				name: elemfn, 
				expression: new MathLib.Expression({
					subtype: 'functionDefinition',
					arguments: [
						new MathLib.Expression({
							subtype: 'variable',
							value: 'x'
						})
					],
					content: [new MathLib.Expression({
							subtype: 'functionCall',
							content: [new MathLib.Expression({
									subtype: 'variable',
									value: 'x'
								})
							],
							value: elemfn
						})
					]
				})
			}),
			writable: true,
			enumerable: true,
			configurable: true
		})
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
export var digitsum = (<any>exports).digitsum;
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
export var sec = (<any>exports).sec;
export var sech = (<any>exports).sech;
export var sign = (<any>exports).sign;
export var sin = (<any>exports).sin;
export var sinh = (<any>exports).sinh;
export var sqrt = (<any>exports).sqrt;
export var tan = (<any>exports).tan;
export var tanh = (<any>exports).tanh;

export var arctan2 = (<any>exports).arctan2;
export var binomial = (<any>exports).binomial;
export var divide = (<any>exports).divide;
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
export var toContentMathML = (<any>exports).toContentMathML;
export var toLaTeX = (<any>exports).toLaTeX;
export var toMathML = (<any>exports).toMathML;
export var toString = (<any>exports).toString;

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