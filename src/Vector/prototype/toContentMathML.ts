/**
 * Returns the content MathML representation of the vector.
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toContentMathML(options : toContentMathMLOptions = {}) : string {
	if (options.strict) {
		return this.reduce(function (old, cur) {
			return old + MathLib.toContentMathML(cur, options);
		}, '<apply><csymbol cd="linalg2">vector</csymbol>') + '</apply>';
	}
	else {
		return this.reduce(function (old, cur) {
			return old + MathLib.toContentMathML(cur, options);
		}, '<vector>') + '</vector>';
	}
}