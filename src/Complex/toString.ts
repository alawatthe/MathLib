// ### [Complex.prototype.toString()](http://mathlib.de/en/docs/Complex/toString)
// Custom toString function
//
// *@return {string}*
toString() : string {
	var str = '';

	if (!this.isFinite()) {
		return 'Complex' + this.re;
	}

	if (!MathLib.isZero(this.re)) {
		str = MathLib.toString(this.re);
	}
	if (!MathLib.isZero(this.im)) {
		str += (this.im > 0 ? (str.length ? '+' : '') : '-') + MathLib.toString(Math.abs(this.im)) + 'i';
	}
	if (str.length === 0) {
		str = '0';
	}
	return str;
}