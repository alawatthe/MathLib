/**
 * Calculates the negative of a rational number
 *
 * @return {Rational}
 */
negative() : Rational {
	return new MathLib.Rational(-this.numerator, this.denominator);
}