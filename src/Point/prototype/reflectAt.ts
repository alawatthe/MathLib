/**
 * Reflects the point at an other point
 *
 * @param {Point} q The point to reflect the current point at.
 * @return {Point}
 */
reflectAt(q : Point) : Point {
	var i, ii,
			reflectedPoint = [],
			p = this.normalize();

	if (q.type === 'point') {
		if (this.dimension === q.dimension) {
			q = q.normalize();
			for (i = 0, ii = this.dimension; i < ii; i++) {
				reflectedPoint.push(2 * q[i] - p[i]);
			}
			reflectedPoint.push(1);
			return new MathLib.Point(reflectedPoint);
		}
	}
}