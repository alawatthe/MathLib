// ### [Complex.prototype.isFinite()](http://mathlib.de/en/docs/Complex/isFinite)
// Determines if the complex number is finite.
//
// *@return {boolean}*
isFinite() : boolean {
	return MathLib.isFinite(this.re);
}