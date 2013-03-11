// ### Complex.prototype.conjugate()
// Calculates the conjugate of a complex number
//
// *@returns {Complex}*
conjugate() : Complex {
	return new MathLib.Complex(this.re, MathLib.negative(this.im));
}