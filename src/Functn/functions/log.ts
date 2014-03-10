/**
 * The log function
 * 
 */
fns.log = {
	functn(b, x) {
		return Math.log(x) / Math.log(b);
	},
	args: ['b', 'x'],
	cdgroup: 'transc1',
	toLaTeX: ['\\log_{', '}\\left(', '\\right)'],
	toMathML: ['<msub><mi>log</mi>', '</msub><mo>&#x2061;</mo><mo>(</mo>', '<mo>)</mo>'],
	toString: ['log_', '(', ')']
};