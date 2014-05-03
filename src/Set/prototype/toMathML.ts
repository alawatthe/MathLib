/**
 * Returns the (presentation) MathML representation of the set
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toMathML(options : toPresentationOptions = {}) : string {
	if (this.isEmpty()) {
		return '<mi>&#x2205;</mi>';
	}
	else {
		return this.reduce(function (old, cur) {
			return old + MathLib.toMathML(cur, options) + '<mo>,</mo>';
		}, '<mrow><mo>{</mo>').slice(0, -10) + '<mo>}</mo></mrow>';
	}
}