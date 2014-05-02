/**
 * Normalizes the point.
 *
 * @return {Point}
 */
normalize() : Point {
	var last = this[this.dimension] || 1;
	return this.map(function (x) {
		return x / last;
	});
}