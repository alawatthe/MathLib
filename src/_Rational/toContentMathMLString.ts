// ### [Rational.prototype.toContentMathMLString()](http://mathlib.de/en/docs/rational/toContentMathMLString)
// Returns the Content MathML representation of the rational number
//
// *@returns {string}*
toContentMathMLString() : String {
	return '<cn type="rational">' + this.numerator + '<sep/>' + this.denominator + '</cn>';
}