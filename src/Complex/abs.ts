// ### [Complex.prototype.abs()](http://mathlib.de/en/docs/Complex/abs)
// Returns the absolute value of the number.
//
// *@return {number}*
abs() : number {
	return MathLib.hypot(this.re, this.im);
}