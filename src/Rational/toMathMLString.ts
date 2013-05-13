// ### [Rational.prototype.toMathMLString()](http://mathlib.de/en/docs/rational/toMathMLString)
// Returns the MathML representation of the rational number
//
// *@return {string}*
toMathMLString() : String {
	return '<mfrac>' + MathLib.toMathMLString(this.numerator) + MathLib.toMathMLString(this.denominator) + '</mfrac>';
}