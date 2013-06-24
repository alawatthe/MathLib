// ### Complex.prototype.isReal()
// Determines if the complex number is real.
//
// *@return {boolean}*
isReal() : boolean {
	return MathLib.isZero(this.im);
}