// ### Complex.prototype.isOne()
// Determines if the complex number is equal to 1.
//
// *@return {boolean}*
isOne() : bool {
	return MathLib.isOne(this.re) && MathLib.isZero(this.im);
}