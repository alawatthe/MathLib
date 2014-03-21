/**
 * The subtraction function
 * 
 */
fns.minus = {
	functn(x, y) {
		return MathLib.plus(x, MathLib.negative(y));
	},
	arity: 2,
	cdgroup: 'arith1',
	toLaTeX: ['', '-', ''],
	toMathML: ['', '<mo>-</mo>', ''],
	toString: ['', ' - ', '']
};