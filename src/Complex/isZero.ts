// ### Complex.prototype.isZero()
// Determines if the complex number is equal to 0.
//
// *@return {boolean}*
isZero() : bool {
	return MathLib.isZero(this.re) && MathLib.isZero(this.im);
}