/**
 * The ceil function
 * 
 */
fns.ceil = {
	functn(x) {
		// Some implementations have a bug where Math.ceil(-0) = +0 (instead of -0)
		if (x === 0) {
			return x;
		}
		return Math.ceil(x);
	},
	cdgroup: 'rounding1',
	contentMathMLName: 'ceiling',
	toLaTeX: ['\\lceil', '\\rceil'],
	toMathML: ['<mo>&lceil;</mo>', '<mo>&rceil;</mo>'],
	toString: ['⌈', '⌉']
};