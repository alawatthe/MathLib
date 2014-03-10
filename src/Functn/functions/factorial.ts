/**
 * The cosine function
 * 
 */
fns.factorial = {
	functn(x) {
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
	args: ['n'],
	cdgroup: 'integer1',
	toLaTeX: ['', '!'],
	toMathML: ['', '<mo>!</mo>'],
	toString: ['', '!']
};