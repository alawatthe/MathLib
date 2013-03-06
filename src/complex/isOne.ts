// ### Complex.prototype.isOne()
// Determines if the complex number is equal to 1.
//
// *@returns {boolean}*
isOne() {
	return MathLib.isOne(this.re) && MathLib.isZero(this.im);
}