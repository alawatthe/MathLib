/**
 * Adds rational numbers
 *
 * @param {Rational|number} summand The number to be added  
 * @return {Rational}
 */
plus(summand) {
	var n = this.numerator,
			d = this.denominator;

	if (summand.type === 'rational') {
		return new MathLib.Rational(MathLib.plus(MathLib.times(d, summand.numerator), MathLib.times(n, summand.denominator)),
			MathLib.times(d, summand.denominator));
	}
	else if (typeof summand === 'number') {
		return new MathLib.Rational(MathLib.plus(n, MathLib.times(summand, d)), d);
	}
	// For complex numbers
	else {
		return summand.plus(this);
	}
}