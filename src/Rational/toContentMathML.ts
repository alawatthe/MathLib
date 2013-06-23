// ### [Rational.prototype.toContentMathML()](http://mathlib.de/en/docs/rational/toContentMathML)
// Returns the Content MathML representation of the rational number
//
// *@return {string}*
toContentMathML() : String {
	return '<cn type="rational">' + this.numerator + '<sep/>' + this.denominator + '</cn>';
}