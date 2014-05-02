/**
 * Returns a string representation of the vector.
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toString(options : toPresentationOptions = {}) : string {
	return '(' + this.reduce(function (old, cur) {
		return old + ', ' + MathLib.toString(cur, options);
	}) + ')';
}