/**
 * The logarithm of the gamma function
 * 
 * Algorithm based on [Numerical Recipes Vol. 3, p. 257](www.nr.com)
 */
fns.logGamma = {
	functn(x) {
		var j, tmp, y, ser,
				cof = [
					57.1562356658629235, -59.5979603554754912, 14.1360979747417471, -0.491913816097620199,
					0.339946499848118887e-4, 0.465236289270485756e-4, -0.983744753048795646e-4,
					0.158088703224912494e-3, -0.210264441724104883e-3, 0.217439618115212643e-3,
					-0.164318106536763890e-3, 0.844182239838527433e-4, -0.261908384015814087e-4,
					0.368991826595316234e-5
				];

		if (x === Infinity) {
			return Infinity;
		}

		y = x;
		tmp = x + 5.24218750000000000; // Rational 671/128.
		tmp = (x + 0.5) * Math.log(tmp) - tmp;
		ser = 0.999999999999997092;
		for (j = 0; j < 14; j++) {
			ser += cof[j] / ++y;
		}
		return tmp + Math.log(2.5066282746310005 * ser / x);
	},
	toContentMathML: ['<csymbol cd="transc1">ln</csymbol><apply><ci>Gamma</ci>', '</apply>'],
	toLaTeX: ['\\log\\left(\\Gamma\\left(', '\\right)\\right)'],
	toMathML: ['<mi>log</mi><mo>&#x2061;</mo><mo>(</mo><mi mathvariant="normal">&#x0393;</mi><mo>&#x2061;</mo><mo>(</mo>',
		'<mo>)</mo><mo>)</mo>'],
	toString: ['log(Γ(', '))']
};