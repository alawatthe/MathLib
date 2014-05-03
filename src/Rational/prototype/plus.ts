/**
 * Adds rational numbers
 *
 * @param {Integer|Rational|number|Complex} summand The number to be added  
 * @return {Rational|number|Complex}
 */
plus(summand) {
	if (summand.type !== 'rational') {
		return MathLib.plus.apply(null, MathLib.coerce(this, summand));
	}
	else {
		return new MathLib.Rational(
			MathLib.plus(
				MathLib.times(this.denominator, summand.numerator),
				MathLib.times(this.numerator, summand.denominator)
			),
			MathLib.times(this.denominator, summand.denominator));
	}
}