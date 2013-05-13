// ### Complex.prototype.isFinite()
// Determines if the complex number is finite.
//
// *@return {boolean}*
isFinite() : bool {
	return MathLib.isFinite(this.re) && MathLib.isFinite(this.im);
}