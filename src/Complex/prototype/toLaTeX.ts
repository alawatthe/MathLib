/**
 * Returns the LaTeX representation of the complex number
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toLaTeX(options : toPresentationOptions = {}) : string {
	var option,
			str = '',
			reFlag = !MathLib.isZero(this.re),
			passOptions : toPresentationOptions = {};

	if (!this.isFinite()) {
		return (options.sign ? '+' : '') + '\\text{Complex' + this.re + '}';
	}

	if (!MathLib.isZero(this.im)) {

		for (option in options) {
			if (options.hasOwnProperty(option) && option !== 'sign') {
				passOptions[option] = options[option];
			}
		}

		passOptions.sign = reFlag || options.sign;

		str += MathLib.toLaTeX(this.im, passOptions) + 'i';
	}

	if (reFlag || str.length === 0) {
		str = MathLib.toLaTeX(this.re, options) + str;
	}

	return str;
}