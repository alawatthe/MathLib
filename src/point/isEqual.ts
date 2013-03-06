// ### Point.prototype.isEqual()
// Determines if the point has the same coordinates as an other point
//
// *@param {point}* The point to compare
// *@returns {boolean}*
isEqual(q : Point) : bool {
	var p = this.normalize();
	q = q.normalize();

	if(this.length !== q.length) {
		return false;
	}

	return p.every(function (x, i) {
		return MathLib.isEqual(x, q[i]);
	});
}