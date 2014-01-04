/**
 * Subtracts rational numbers
 *
 * @param {Rational|number} subtrahend The number to be subtracted  
 * @return {Rational}
 */
minus(subtrahend) {
	var n = this.numerator,
			d = this.denominator;

	if (subtrahend.type === 'rational') {
		return new MathLib.Rational(MathLib.minus(MathLib.times(n, subtrahend.denominator), MathLib.times(d, subtrahend.numerator)),
			MathLib.times(d, subtrahend.denominator));
	}
	else if (typeof subtrahend === 'number') {
		return new MathLib.Rational(MathLib.minus(n, MathLib.times(subtrahend, d)), d);
	}
	// For complex numbers
	else {
		return subtrahend.minus(this).negative();
	}
}