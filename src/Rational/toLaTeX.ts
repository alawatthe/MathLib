// ### [Rational.prototype.toLaTeX()](http://mathlib.de/en/docs/Rational/toLaTeX)
// Returns the LaTeX representation of the rational number
//
// *@return {string}*
toLaTeX() : string {
	return '\\frac{' + MathLib.toLaTeX(this.numerator) + '}{' + MathLib.toLaTeX(this.denominator) + '}';
}