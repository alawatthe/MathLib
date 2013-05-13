// ### Complex.prototype.arcsin()
// Returns the inverse sine of the number
//
// *@return {Complex}*
arcsin() : Complex {
	var a = this.re, b = this.im,
			aa = a * a,
			bb = b * b;
	return new MathLib.Complex(
			MathLib.sign(a) / 2 * MathLib.arccos(Math.sqrt(Math.pow(aa + bb - 1, 2) + 4 * bb) - (aa + bb)),
			MathLib.sign(b) / 2 * MathLib.arcosh(Math.sqrt(Math.pow(aa + bb - 1, 2) + 4 * bb) + (aa + bb))
		);
}