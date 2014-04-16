/**
 * Custom toString function
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toString(options : toPresentationOptions = {}) : string {
	var str = '', option,
			reFlag = !MathLib.isZero(this.re),
			passOptions : toPresentationOptions = {};

	if (!this.isFinite()) {
		return (options.sign ? '+' : '') + 'Complex' + this.re;
	}

	if (!MathLib.isZero(this.im)) {

		for (option in options) {
			if (options.hasOwnProperty(option) && option !== 'sign') {
				passOptions[option] = options[option];
			}
		}

		passOptions.sign = reFlag || options.sign;

		str += MathLib.toString(this.im, passOptions) + 'i';
	}

	if (reFlag || str.length === 0) {
		str = MathLib.toString(this.re, options) + str;
	}

	return str;
}