// ### [Rational.prototype.inverse()](http://mathlib.de/en/docs/rational/inverse)
// Calculates the inverse of a rational number
//
// *@return {Rational}*
inverse() : Rational {
	if (!MathLib.isZero(this.numerator)) {
		return new MathLib.Rational(this.denominator, this.numerator);
	}
}