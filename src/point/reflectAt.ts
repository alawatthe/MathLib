// ### Point.prototype.reflectAt()
// Reflects the point at an other point
//
// *@returns {point}*
reflectAt(a : Point) : Point {
	if (a.type === 'point') {
		if (this.dim === a.dim) {
			var arr = [], i,
					p = this.normalize();
			a = a.normalize();
			for (i = 0; i < this.dim; i++) {
				arr.push(2 * a[i] - p[i]);
			}
			arr.push(1);
			return new MathLib.Point(arr);
		}
	}
}