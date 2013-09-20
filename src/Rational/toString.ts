// ### [Rational.prototype.toString()](http://mathlib.de/en/docs/Rational/toString)
// Custom toString function
//
// *@return {string}*
toString() : string {
	return MathLib.toString(this.numerator) + '/' + MathLib.toString(this.denominator);
}