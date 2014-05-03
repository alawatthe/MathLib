/**
 * The root function
 * 
 */
fns.root = {
	functn(x, y) {
		return Math.pow(x, 1 / y);
	},
	arity: 2,
	cdgroup: 'arith1',
	// toLaTeX can't use \sqrt since this requires the arguments in reverse order.
	// toLaTeX: ['\\sqrt[', ']{', '}'],
	toLaTeX: ['\\left(', '\\right)^{\\frac{1}{', '}}'],
	toMathML: ['<mroot>', '', '</mroot>'],
	toString: ['(', ')^(1/', ')']
};