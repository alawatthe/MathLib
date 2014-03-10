/**
 * Returns the LaTeX representation of the set
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toLaTeX(options : toPresentationOptions = {}) : string {
	if (this.isEmpty()) {
		return '\\emptyset';
	}
	else {
		return this.reduce(function (old, cur) {
			return old + MathLib.toLaTeX(cur, options) + ', ';
		}, '\\left{').slice(0, -2) + '\\right}';
	}
}