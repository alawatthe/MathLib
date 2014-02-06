/**
 * Returns the LaTeX representation of the rational number
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toLaTeX(options : toPresentationOptions = {}) : string {
	var numerator,
			str = '',
			passOptions = {base: options.base, baseSubscript: options.baseSubscript};

	if (options.sign) {
		str = MathLib.toString(this.numerator, {sign: true}).slice(0, 1);
		numerator = MathLib.toLaTeX(MathLib.abs(this.numerator), passOptions);
	}
	else {
		numerator = MathLib.toLaTeX(this.numerator, passOptions);
	}

	return str
					+	'\\frac{' 
					+ numerator
					+ '}{'
					+ MathLib.toLaTeX(this.denominator, passOptions)
					+ '}';
}