// ### Complex.prototype.copy()
// Copies the complex number
//
// *@returns {Complex}*
copy() : Complex {
	return new MathLib.Complex(MathLib.copy(this.re), MathLib.copy(this.im));
}