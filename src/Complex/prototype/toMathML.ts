/**
 * Returns the (presentation) MathML representation of the number
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toMathML(options : toPresentationOptions = {}) : string {
	var str = '',
			reFlag = !MathLib.isZero(this.re);

	if (!this.isFinite()) {
		return (options.sign ? '<mo>+</mo>' : '') + '<mi>Complex' + this.re + '</mi>';
	}

	if (!MathLib.isZero(this.im)) {
		if (reFlag || options.sign) {			
			str += '<mo>' + MathLib.toString(this.im, {sign: true}).slice(0, 1) + '</mo><mrow>'
					+ MathLib.toMathML(MathLib.abs(this.im), {base: options.base, baseSubscript: options.baseSubscript, sign: false})
					+ '<mo>&#x2062;</mo><mi>i</mi></mrow>';
		}
		else {
			str += '<mrow>'
					+ MathLib.toMathML(this.im, {base: options.base, baseSubscript: options.baseSubscript})
					+ '<mo>&#x2062;</mo><mi>i</mi></mrow>';
		}
	}

	if (reFlag || str.length === 0) {
		str = MathLib.toMathML(this.re, options) + str;
	}

	return str;
}