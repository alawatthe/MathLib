/**
 * A presentation MathML string representation
 *
 * @return {string}
 */
toMathML() : string {
	return '<mn>'
					+ this.toString()
					+ '</mn>';
}