/**
 * Calculates the complex number raised to some power
 *
 * @param {numeric} c The power to which the complex number should be raised
 * @return {Complex}
 */
pow(c) : Complex {
	var re, im, abs, arg;

	if (MathLib.type(c) === 'complex') {
		re = c.re;
		im = c.im;
		abs = this.abs();
		arg = this.arg();

		// Fixes inf^(2+5i) = inf and 0^(2+5i) = 0
		if ((this.isZero() || this.re === Infinity) && !(c.isZero() || c.re === Infinity || MathLib.isNaN(c.re))) {
			return new MathLib.Complex(this.re, this.im);
		}

		return MathLib.Complex.polar(
			MathLib.times(
				MathLib.pow(abs, re),
				MathLib.exp(
					MathLib.negative(
						MathLib.times(im, arg)
					)
				)
			),
			MathLib.plus(MathLib.times(re, arg), MathLib.times(im, MathLib.ln(abs)))
		);
	}
	else {
		// The naive pow method has some rounding errrors. For example
		// (2+5i)^3 = -142.00000000000006-64.99999999999999i
		// instead of -142-65i which are errors of magnitude around 1e-14.
		// This error increases quickly for increasing exponents.
		// (2+5i)^21 has an error of 5.8 in the real part
		// return MathLib.Complex.polar(MathLib.pow(abs, c), MathLib.times(arg, c));

		// The following algorithm uses a different approach for integer exponents,
		// where it yields exact results.
		// Non integer exponents are evaluated using the naive approach.
		// TODO: Improve the algorithm.
		var i,
				int = MathLib.floor(Math.abs(c)),
				res = new MathLib.Complex(1),
				power = this,
				bin = int.toString(2);

		// If the exponent is not an integer we use the naive approach
		if (c % 1) {
			abs = this.abs();
			arg = this.arg();
			return MathLib.Complex.polar(MathLib.pow(abs, c), MathLib.times(arg, c));
		}

		// The imaginary part of (2+5i)^-0 should be -0 not +0.
		if (MathLib.isZero(c)) {
			return new MathLib.Complex(1, c);
		}

		for (i = bin.length - 1; i >= 0; i--) {
			if (bin[i] === '1') {
				res = MathLib.times(res, power);
			}
			power = MathLib.times(power, power);
		}


		if (c < 0) {
			res = res.inverse();
		}

		return res;
	}
}
