/**
 * Returns a string representation of the vector.
 *
 * @return {string}
 */
toString() : string {
	return '(' + this.reduce(function (old, cur) {
		return old + ', ' + MathLib.toString(cur);
	}) + ')';
}