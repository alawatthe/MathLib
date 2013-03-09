// ### Complex.prototype.ln()
// Evaluates the natural logarithm with complex arguments
//
// *@returns {complex}*
ln() : Complex {
	return new MathLib.Complex(MathLib.ln(this.abs()), this.arg());
}