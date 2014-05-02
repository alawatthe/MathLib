/**
 * Returns a string representation of the set
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toString(options : toPresentationOptions = {}) : string {
	if (this.isEmpty()) {
		return '∅';
	}
	else {
		return this.reduce(function (old, cur) {
			return old + MathLib.toString(cur, options) + ', ';
		}, '{').slice(0, -2) + '}';
	}
}