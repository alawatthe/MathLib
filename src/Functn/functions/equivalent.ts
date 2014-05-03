/**
 * This function determines if the arguments are equivalent as booleans
 *
 */
fns.equivalent = {
	functn(x : boolean, y : boolean) {
		return Boolean(x) === Boolean(y);
	},
	arity: 2,
	cdgroup: 'logic1',
	toLaTeX: ['', ' \\Leftrightarrow ', ''],
	toMathML: ['', '<mo>&#x21D4;</mo>', ''],
	toString: ['', ' ⇔ ', '']
};