/**
 * Checks whether a number is NaN or not
 * 
 */
fns.isNaN = {
	functn(x) {
		return x !== x;
	},
	toContentMathML: ['<csymbol cd="relation1">eq</csymbol>', '<csymbol cd="nums1">NaN</csymbol>']
};