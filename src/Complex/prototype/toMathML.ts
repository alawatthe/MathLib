/**
 * Returns the (presentation) MathML representation of the number
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toMathML(options : toPresentationOptions = {}) : string {
	var str = '', option,
			reFlag = !MathLib.isZero(this.re),
			passOptions : toPresentationOptions = {};

	if (!this.isFinite()) {
		return (options.sign ? '<mo>+</mo>' : '') + '<mi>Complex' + this.re + '</mi>';
	}

	if (!MathLib.isZero(this.im)) {
		for (option in options) {
			if (options.hasOwnProperty(option) && option !== 'sign') {
				passOptions[option] = options[option];
			}
		}

		if (reFlag || options.sign) {
			passOptions.sign = false;
			str += '<mo>' + MathLib.toString(this.im, {sign: true}).slice(0, 1) + '</mo><mrow>'
					+ MathLib.toMathML(MathLib.abs(this.im), passOptions)
					+ '<mo>&#x2062;</mo><mi>i</mi></mrow>';
		}
		else {
			str += '<mrow>'
					+ MathLib.toMathML(this.im, passOptions)
					+ '<mo>&#x2062;</mo><mi>i</mi></mrow>';
		}
	}

	if (reFlag || str.length === 0) {
		str = MathLib.toMathML(this.re, options) + str;
	}

	return str;
}