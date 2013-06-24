// ### [Rational.prototype.toMathML()](http://mathlib.de/en/docs/rational/toMathML)
// Returns the MathML representation of the rational number
//
// *@return {string}*
toMathML() : string {
	return '<mfrac>' + MathLib.toMathML(this.numerator) + MathLib.toMathML(this.denominator) + '</mfrac>';
}