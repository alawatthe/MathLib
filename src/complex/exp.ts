// ### Complex.prototype.exp()
// Evaluates the exponential function with complex argument
//
// *@returns {complex}*
exp() {
	return new MathLib.Complex(MathLib.exp(this.re) * MathLib.cos(this.im), MathLib.exp(this.re)*MathLib.sin(this.im));
}