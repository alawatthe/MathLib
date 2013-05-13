// ### Complex.prototype.isReal()
// Determines if the complex number is real.
//
// *@return {boolean}*
isReal() : bool {
	return MathLib.isZero(this.im);
}