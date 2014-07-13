/**
 * Returns the content MathML representation of the set
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toContentMathML(options : toContentMathMLOptions = {}) : string {

	if (options.strict) {
		if (this.isEmpty()) {
			return '<csymbol cd="set1">emptyset</csymbol>';
		}
		else {

			return this.reduce(function (old, cur) {
				return old + MathLib.toContentMathML(cur, options);
			}, '<apply><csymbol cd="set1">set</csymbol>') + '</apply>';
		}
	}

	else {
		if (this.isEmpty()) {
			return '<emptyset/>';
		}
		else {
			return this.reduce(function (old, cur) {
				return old + MathLib.toContentMathML(cur, options);
			}, '<set>') + '</set>';
		}
	}
}
