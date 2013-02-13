// ### [Rational.prototype.isEqual()](http://mathlib.de/en/docs/rational/isEqual)
// Checks if the rational number is equal to an other number
//
// *@returns {bool}*
isEqual(r) : bool {
	return MathLib.isEqual(MathLib.times(this.numerator, r.denominator), MathLib.times(this.denominator, r.numerator));
}