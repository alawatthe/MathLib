/**
 * Returns the MathML representation of the rational number
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toMathML(options : toPresentationOptions = {}) : string {
	var numerator, option,
			str = '',
			passOptions = {};

	for (option in options) {
		if (options.hasOwnProperty(option) && option !== 'sign') {
			passOptions[option] = options[option];
		}
	}

	if (options.sign) {
		str = '<mo>' + MathLib.toString(this.numerator, {sign: true}).slice(0, 1) + '</mo>';
		numerator = MathLib.toMathML(MathLib.abs(this.numerator), passOptions);
	}
	else {
		numerator = MathLib.toMathML(this.numerator, passOptions);
	}

	return str
					+ '<mfrac>'
					+ numerator
					+ MathLib.toMathML(this.denominator, passOptions)
					+ '</mfrac>';
}