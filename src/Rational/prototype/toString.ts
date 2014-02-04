/**
 * Custom toString function
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toString(options : toPresentationOptions = {}) : string {
	return MathLib.toString(this.numerator, options) + '/'
					+ MathLib.toString(this.denominator, {base: options.base, baseSubscript: options.baseSubscript});
}