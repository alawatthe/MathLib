// ### [Rational.prototype.isEqual()](http://mathlib.de/en/docs/Rational/isEqual)
// Checks if the rational number is equal to an other number
//
// *@return {boolean}*
isEqual(r) : boolean {
	return MathLib.isEqual(MathLib.times(this.numerator, r.denominator), MathLib.times(this.denominator, r.numerator));
}