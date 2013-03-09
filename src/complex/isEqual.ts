// ### Complex.prototype.isEqual()
// Determines if the complex number is equal to another number.
//
// *@returns {boolean}*
isEqual(n) : bool {
	if (typeof n === 'number') {
		return MathLib.isEqual(this.re, n) && MathLib.isZero(this.im);
	}
	if (n.type === 'complex') {
		return MathLib.isEqual(this.re, n.re) && MathLib.isEqual(this.im, n.im);
	}
	return false;
}