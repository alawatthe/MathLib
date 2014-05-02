/**
 * Determine if a point is in, on or outside a circle.
 *
 * @param {Point} point The Point to determine the position of
 * @return {string}
 */
positionOf(point : Point) : string {
	var diff;
	if (point.type === 'point' && point.dimension === 2) {
		diff = point.distanceTo(this.center) - this.radius;
		if (MathLib.isZero(diff)) {
			return 'on';
		}
		else if (diff < 0) {
			return 'in';
		}
		else {
			return 'out';
		}
	}
}