// ### Complex.prototype.ln()
// Evaluates the natural logarithm with complex arguments
//
// *@return {Complex}*
ln() : Complex {
	return new MathLib.Complex(MathLib.ln(this.abs()), this.arg());
}