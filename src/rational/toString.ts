// ### [Rational.prototype.toString()](http://mathlib.de/en/docs/rational/toString)
// Custom toString function
//
// *@returns {string}*
toString() : String {
	return MathLib.toString(this.numerator) + '/' + MathLib.toString(this.denominator);
}