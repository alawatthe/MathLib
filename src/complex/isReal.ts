// ### Complex.prototype.isReal()
// Determines if the complex number is real.
//
// *@returns {boolean}*
isReal() : bool {
	return MathLib.isZero(this.im);
}