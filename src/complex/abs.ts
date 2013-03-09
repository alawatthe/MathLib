// ### Complex.prototype.abs()
// Returns the absolute value of the number.
//
// *@returns {number}*
abs() : number {
	return MathLib.hypot(this.re, this.im);
}