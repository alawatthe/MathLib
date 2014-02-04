/**
 * Custom toString function
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toString(options : toPresentationOptions = {}) : string {
	var str = '',
			reFlag = !MathLib.isZero(this.re);

	if (!this.isFinite()) {
		return (options.sign ? '+' : '') + 'Complex' + this.re;
	}

	if (!MathLib.isZero(this.im)) {
		str += MathLib.toString(this.im, {base: options.base, baseSubscript: options.baseSubscript, sign: reFlag || options.sign}) + 'i';
	}

	if (reFlag || str.length === 0) {
		str = MathLib.toString(this.re, options) + str;
	}

	return str;
}