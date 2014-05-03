/**
 * Divides rational numbers
 *
 * @param {Rational|number} divisor The divisor  
 * @return {Rational}
 */
divide(divisor) {
	if (divisor.type === 'rational') {
		return new MathLib.Rational(
			MathLib.times(this.numerator, divisor.denominator),
			MathLib.times(this.denominator, divisor.numerator)
			);
	}
	else if (typeof divisor === 'number') {
		return new MathLib.Rational(this.numerator, MathLib.times(this.denominator, divisor));
	}
	// For complex numbers
	else {
		return divisor.inverse().times(this);
	}
}