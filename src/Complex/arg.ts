// ### [Complex.prototype.arg()](http://mathlib.de/en/docs/Complex/arg)
// Returns the argument (= the angle) of the complex number
//
// *@return {number}*
arg() : number {
	if (this.re === Infinity) {
		return NaN;
	}
	return Math.atan2(this.im, this.re);
}