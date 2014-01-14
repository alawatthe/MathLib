/**
 * Returns the (presentation) MathML representation of the number
 *
 * @return {string}
 */
toMathML() : string {
	var str = '', reFlag = false;

	if (!this.isFinite()) {
		return '<mi>Complex' + this.re + '</mi>';
	}

	if (!MathLib.isZero(this.re)) {
		str = MathLib.toMathML(this.re);
		reFlag = true;
	}
	if (!MathLib.isZero(this.im)) {
		str += MathLib.toMathML(this.im, reFlag) + '<mo>&#x2062;</mo><mi>i</mi>';
	}
	if (str.length === 0) {
		str = '<mn>0</mn>';
	}
	return str;
}