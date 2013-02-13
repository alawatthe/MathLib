// ### [Rational.prototype.toLaTeX()](http://mathlib.de/en/docs/rational/toLaTeX)
// Returns the LaTeX representation of the rational number
//
// *@returns {string}*
toLaTeX() : String {
	return '\\frac{' + MathLib.toLaTeX(this.numerator) + '}{' + MathLib.toLaTeX(this.denominator) + '}';
}