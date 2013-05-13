// ### Complex.prototype.arccot()
// Returns the inverse cotangent of the number.
//
// *@return {Complex}*
arccot() : Complex {
	return MathLib.minus(Math.PI / 2, this.arctan());
}