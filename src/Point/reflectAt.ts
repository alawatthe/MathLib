// ### Point.prototype.reflectAt()
// Reflects the point at an other point
//
// *@return {Point}*
reflectAt(a : Point) : Point {
	var i, ii,
			reflectedPoint = [],
			p = this.normalize();

	if (a.type === 'point') {
		if (this.dimension === a.dimension) {
			a = a.normalize();
			for (i = 0, ii = this.dimension; i < ii; i++) {
				reflectedPoint.push(2 * a[i] - p[i]);
			}
			reflectedPoint.push(1);
			return new MathLib.Point(reflectedPoint);
		}
	}
}