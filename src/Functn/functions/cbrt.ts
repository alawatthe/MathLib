/**
 * The cube root function
 *
 */
fns.cbrt = {
	functn(x) {
		var a3, a3x, an, a;

		// Handle ±0, NaN, ±∞
		if (x === 0 || x !== x || x === Infinity || x === -Infinity) {
			return x;
		}

		// Get an approximation
		a = MathLib.sign(x) * Math.pow(Math.abs(x), 1 / 3);

		// Halley's method
		while (true) {
			a3 = Math.pow(a, 3);
			a3x = a3 + x;
			an = a * (a3x + x) / (a3x + a3);
			if (MathLib.isZero(an - a)) {
				break;
			}
			a = an;
		}
		return an;
	},
	cdgroup: 'arith1',
	toContentMathML: ['<csymbol cd="arith1">root</csymbol>', '<cn>3</cn>'],
	toLaTeX: ['\\sqrt[3]{', '}'],
	toMathML: ['<mroot>', '<mn>3</mn></mroot>']
};
