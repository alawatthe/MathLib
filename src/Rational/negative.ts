// ### [Rational.prototype.negative()](http://mathlib.de/en/docs/rational/negative)
// Calculates the negative of a rational number
//
// *@return {Rational}*
negative() : Rational {
	return new MathLib.Rational(-this.numerator, this.denominator);
}