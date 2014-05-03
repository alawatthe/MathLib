/**
 * Returns the Content MathML representation of the rational number
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toContentMathML(options : toContentMathMLOptions = {}) : string {
	var base;

	if (options.strict) {
		return '<apply><csymbol cd="nums1">rational</csymbol>'
						+ MathLib.toContentMathML(this.numerator, options)
						+ MathLib.toContentMathML(this.denominator, options)
						+ '</apply>';
	}
	else {
		base = (options.base || 10);
		return '<cn type="rational"'
						+ ((base !== 10) ? ' base="' + base + '"' : '')
						+ '>'
						+ MathLib.toString(this.numerator, {base: base})
						+ '<sep/>'
						+ MathLib.toString(this.denominator, {base: base})
						+ '</cn>';
	}
}