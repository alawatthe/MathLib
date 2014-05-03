/**
 * A content MathML string representation
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toContentMathML(options : toContentMathMLOptions = {}) : string {
	var base = options.base || 10;

	// In section 4.2.1.3 in the MathML 3 specification
	// under "Rewrite: cn based_integer" it says
	// "A base attribute with value 10 is simply removed"
	if (base === 10) {
		return  '<cn type="integer">'
						+ this.toString()
						+ '</cn>';
	}
	else if (options.strict) {
		return '<apply><csymbol cd="nums1">based_integer</csymbol><cn>'
						+ base
						+ '</cn><cs>'
						+ this.toString({base: base})
						+ '</cs></apply>';
	}
	else {
		return '<cn type="integer" base="' + base + '">'
						+ this.toString({base: base})
						+ '</cn>';
	}
}