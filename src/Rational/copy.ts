/**
 * Copy the rational number
 *
 * @return {Rational}
 */
copy() : Rational {
	return new MathLib.Rational(MathLib.copy(this.numerator), MathLib.copy(this.denominator));
}