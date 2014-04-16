/**
 * Custom toString function
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toString(options : toPresentationOptions = {}) : string {
	var option,
			passOptions = {};

	for (option in options) {
		if (options.hasOwnProperty(option) && option !== 'sign') {
			passOptions[option] = options[option];
		}
	}

	return MathLib.toString(this.numerator, options) + '/'
					+ MathLib.toString(this.denominator, passOptions);
}