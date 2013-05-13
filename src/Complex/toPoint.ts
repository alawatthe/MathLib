// ### Complex.prototype.toPoint()
// Interprets the complex number as point in the two dimensional plane
//
// *@return {Point}*
toPoint() : Point {
	return new MathLib.Point(this.re, this.im);
}