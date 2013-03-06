// ### Complex.prototype.isReal()
// Determines if the complex number is real.
//
// *@returns {boolean}*
isReal() {
	return MathLib.isZero(this.im);
}