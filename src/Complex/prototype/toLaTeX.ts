/**
 * Returns the LaTeX representation of the complex number
 *
 * @return {string}
 */
toLaTeX() : string {
	var str = '',
			reFlag = false;

	if (!this.isFinite()) {
		return '\\text{Complex' + this.re + '}';
	}

	if (!MathLib.isZero(this.re)) {
		str = MathLib.toLaTeX(this.re);
		reFlag = true;
	}
	if (!MathLib.isZero(this.im)) {
		str += MathLib.toLaTeX(this.im, reFlag) + 'i';
	}
	if (str.length === 0) {
		str = '0';
	}
	return str;
}