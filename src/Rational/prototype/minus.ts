/**
 * Subtracts rational numbers
 *
 * @param {Rational|number} subtrahend The number to be subtracted  
 * @return {Rational}
 */
minus(subtrahend) {
	if (subtrahend.type !== 'rational') {
		return MathLib.minus.apply(null, MathLib.coerce(this, subtrahend));
	}
	else {
		return new MathLib.Rational(
			MathLib.minus(
				MathLib.times(this.numerator, subtrahend.denominator),
				MathLib.times(this.denominator, subtrahend.numerator)
			),
			MathLib.times(this.denominator, subtrahend.denominator));
	}
}