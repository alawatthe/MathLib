/**
 * The division function
 * 
 */
fns.divide = {
	functn(x, y) {
		return MathLib.times(x, MathLib.inverse(y));
	},
	arity: 2,
	cdgroup: 'arith1',
	toLaTeX: ['\\frac{', '}{', '}'],
	toMathML: ['<mfrac>', '', '</mfrac>'],
	toString: ['', '/', '']
};