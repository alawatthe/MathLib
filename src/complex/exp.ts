// ### Complex.prototype.exp()
// Evaluates the exponential function with a complex argument
//
// *@returns {complex}*
exp() : Complex {
	return new MathLib.Complex(MathLib.exp(this.re) * MathLib.cos(this.im), MathLib.exp(this.re)*MathLib.sin(this.im));
}