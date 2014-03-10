/**
 * The remainder function
 * 
 */
fns.rem = {
	functn(n, m) {
		if (!MathLib.isFinite(m)) {
			return NaN;
		}
		return n % m;
	},
	args: ['n', 'm'],
	cdgroup: 'integer1',
	contentMathMLName: 'remainder',
	toLaTeX: ['', ' \\operatorname{rem} ', ''],
	toMathML: ['', '<mi>rem</mi>', ''],
	toString: ['', ' rem ', '']
};