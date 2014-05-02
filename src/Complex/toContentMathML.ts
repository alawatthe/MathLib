/**
 * A content MathML string representation
 *
 * @return {string} 
 */
static toContentMathML(options : toContentMathMLOptions = {}) : string {
	if (options.strict) {
		return '<csymbol cd="setname1">C</csymbol>';
	}
	return '<complexes/>';
}