/**
 * The logic implies function
 *
 */
fns.implies = {
	functn(x : boolean, y : boolean) {
		if (Boolean(x) && !Boolean(y)) {
			return false;
		}
		return true;
	},
	arity: 2,
	cdgroup: 'logic1',
	toLaTeX: ['', ' \\Rightarrow ', ''],
	toMathML: ['', '<mo>&#x21D2;</mo>', ''],
	toString: ['', ' ⇒ ', '']
};