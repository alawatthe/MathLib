/**
 * Returns the LaTeX representation of the rational number
 *
 * @return {string}
 */
toLaTeX() : string {
	return '\\frac{' + MathLib.toLaTeX(this.numerator) + '}{' + MathLib.toLaTeX(this.denominator) + '}';
}