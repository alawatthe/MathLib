/**
 * The lg function
 * 
 */
fns.lg = {
	functn(x) {
		return Math.log(x) / Math.LN10;
	},
	toContentMathML: ['<csymbol cd="transc1">log</csymbol><cn>10</cn>', ''],
	toLaTeX: ['\\lg\\left(', '\\right)'],
	toMathML: ['<mi>lg</mi><mo>&#x2061;</mo><mo>(</mo>', '<mo>)</mo>'],
	toString: ['lg(', ')']
};