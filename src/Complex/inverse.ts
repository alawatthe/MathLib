// ### Complex.prototype.inverse()
// Calculates the inverse of a complex number
//
// *@return {Complex}*
inverse() : Complex {
	return new MathLib.Complex(MathLib.divide(this.re, MathLib.plus(MathLib.pow(this.re, 2), MathLib.pow(this.im, 2))),
		MathLib.divide(MathLib.negative(this.im), MathLib.plus(MathLib.pow(this.re, 2), MathLib.pow(this.im, 2))));
}