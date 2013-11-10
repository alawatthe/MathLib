// ### [Complex.prototype.isEqual()](http://mathlib.de/en/docs/Complex/isEqual)
// Determines if the complex number is equal to another number.
//
// *@param {Complex|number|Rational}* The number to be compared  
// *@return {boolean}*
isEqual(n) : boolean {
	if (typeof n === 'number') {
		return MathLib.isEqual(this.re, n) && MathLib.isZero(this.im);
	}
	if (n.type === 'complex') {
		return MathLib.isEqual(this.re, n.re) && MathLib.isEqual(this.im, n.im);
	}
	return false;
}