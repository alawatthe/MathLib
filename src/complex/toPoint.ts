// ### Complex.prototype.toPoint()
// Interprets the complex number as point in the two dimensional plane
//
// *@returns {point}*
toPoint() {
	return new MathLib.Point(this.re, this.im);
}