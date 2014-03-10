/**
 * The logic not function
 * 
 */
fns.not = {
	functn(x) {
		return !x;
	},
	cdgroup: 'logic1',
	toLaTeX: ['\\neg ', ''],
	toMathML: ['<mo>&#xac;</mo>', ''],
	toString: ['¬', '']
};