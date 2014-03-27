/**
 * The pow function
 * 
 */
fns.pow = {
	functn(x, y) {
		if (x === 1 || (x === -1 && (y === Infinity || y === -Infinity))) {
			return 1;
		}
		// Bugfix for Opera 12, where
		//  > MathLib.pow(-0, -5) == -Infinity // should be Infinity
		//  > MathLib.pow(-0, 5) == +0 // should be -0
		// Weirdly this problem occurs only sometimes, in a very random way...
		/* istanbul ignore if */
		if (MathLib.isNegZero(x) && Math.abs(y % 2) === 1) {
			return y < 0 ? -Infinity : -0;
		}
		return Math.pow(x, y);
	},
	arity: 2,
	cdgroup: 'arith1',
	toContentMathML: ['<csymbol cd="arith1">power</csymbol>', '', ''],
	toLaTeX: ['\\left(', '\\right)^{', '}'],
	toMathML: ['<msup>', '', '</msup>'],
	toString: ['(', ')^(', ')']
};