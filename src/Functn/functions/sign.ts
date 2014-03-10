/**
 * The sign function
 * 
 */
fns.sign = {
	functn(x) {
		return x && (x < 0 ? -1 : 1);
	},
	toContentMathML: ['<ci>sign</ci>']
};