/**
 * The modulo function
 * 
 */

fns.mod = {
	functn(n, m) {
		return n - (m * Math.floor(n / m));
	},
	args: ['n', 'm'],
	toContentMathML: ['<ci>mod</ci>', '', ''],
	toLaTeX: ['', ' \\mod ', ''],
	toMathML: ['', '<mi>mod</mi>', ''],
	toString: ['', ' mod ', '']
};
