// ### Complex.prototype.isFinite()
// Determines if the complex number is finite.
//
// *@return {boolean}*
isFinite() : boolean {
	return MathLib.isFinite(this.re) && MathLib.isFinite(this.im);
}