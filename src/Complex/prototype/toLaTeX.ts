/**
 * Returns the LaTeX representation of the complex number
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toLaTeX(options : toPresentationOptions = {}) : string {
	var str = '',
			reFlag = !MathLib.isZero(this.re);

	if (!this.isFinite()) {
		return (options.sign ? '+' : '') + '\\text{Complex' + this.re + '}';
	}

	if (!MathLib.isZero(this.im)) {
		str += MathLib.toLaTeX(this.im, {base: options.base, baseSubscript: options.baseSubscript, sign: reFlag || options.sign}) + 'i';
	}

	if (reFlag || str.length === 0) {
		str = MathLib.toLaTeX(this.re, options) + str;
	}

	return str;
}