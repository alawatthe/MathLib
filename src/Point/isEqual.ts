// ### Point.prototype.isEqual()
// Determines if the point has the same coordinates as an other point
//
// *@param {Point}* The point to compare  
// *@return {boolean}*
isEqual(q : Point) : bool {
	var p = this.normalize();
	q = q.normalize();

	if (this.length !== q.length) {
		return false;
	}

	return p.every(function (x, i) {
		return MathLib.isEqual(x, q[i]);
	});
}