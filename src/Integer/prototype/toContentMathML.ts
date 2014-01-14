/**
 * A content MathML string representation
 *
 * @return {string}
 */
toContentMathML() : string {
	return '<cn type="integer" base="10">'
					+ this.toString()
					+ '</cn>';
}