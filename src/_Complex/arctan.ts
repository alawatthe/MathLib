// ### Complex.prototype.arctan()
// Returns the inverse tangent of the number
//
// *@returns {Complex}*
arctan() : Complex {
	var iz = new MathLib.Complex(-this.im, this.re);
	return MathLib.times(new MathLib.Complex(0, 0.5), MathLib.ln(MathLib.divide( MathLib.plus(1, iz), MathLib.minus(1, iz))));
}