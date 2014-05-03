/**
 * Multiplies rational numbers
 *
 * @param {Rational|number} factor The number to be multiplied  
 * @return {Rational}
 */
times(factor) {
	if (factor.type === 'rational') {
		return new MathLib.Rational(
			MathLib.times(this.numerator, factor.numerator),
			MathLib.times(this.denominator, factor.denominator)
			);
	}
	else if (typeof factor === 'number') {
		return new MathLib.Rational(MathLib.times(this.numerator, factor), this.denominator);
	}
	// For complex numbers, matrices, vectors, polynomials
	else {
		return factor.times(this);
	}
}