// ### Complex.prototype.sin()
// Calculates the sine of a complex number
//
// *@returns {complex}*
sin() {
	return new MathLib.Complex(MathLib.sin(this.re) * MathLib.cosh(this.im), MathLib.cos(this.re)*MathLib.sinh(this.im));
}