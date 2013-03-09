// ### Complex.prototype.sinh()
// Calculates the hyperbolic sine of a complex number
//
// *@returns {complex}*
sinh() : Complex {
	return new MathLib.Complex(MathLib.cos(this.im) * MathLib.sinh(this.re), MathLib.sin(this.im)*MathLib.cosh(this.re));
}