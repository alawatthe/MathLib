/**
 * The pow function
 * 
 */
fns.pow = {
	functn(x, y) {
		if (x === 1 || (x === -1 && (y === Infinity || y === -Infinity))) {
			return 1;
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