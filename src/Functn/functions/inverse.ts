/**
 * This function calculates the multiplicative inverse
 * 
 */
fns.inverse = {
	functn(x) {
		return 1 / x;
	},
	toContentMathML: ['<csymbol cd="arith1">divide</csymbol><cn>1</cn>', ''],
	toLaTeX: ['\\frac{1}{', '}'],
	toMathML: ['<mfrac><mn>1</mn>', '</mfrac>'],
	toString: ['1/', '']
};