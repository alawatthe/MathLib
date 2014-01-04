/**
 * Converts the matrix to a two-dimensional array
 *
 * @return {array}
 */
toArray() {
	return Array.prototype.map.call(this, function (x) {
		return Array.prototype.map.call(x, function (y) {
			return MathLib.copy(y);
		});
	});
}