// ### Complex.prototype.negative()
// Calculates the negative of the complex number
//
// *@returns {complex}*
negative() : Complex {
	return new MathLib.Complex(MathLib.negative(this.re), MathLib.negative(this.im));
}