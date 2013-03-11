// ### Point.prototype.isFinite()
// Determines if the point is finite
//
// *@returns {boolean}*
isFinite() : bool {
	return !MathLib.isZero(this[this.length - 1]);
}