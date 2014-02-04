/**
 * Returns the MathML representation of the rational number
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toMathML(options : toPresentationOptions = {}) : string {
	var numerator,
			str = '',
			passOptions = {base: options.base, baseSubscript: options.baseSubscript};

	if (options.sign) {
		str = '<mo>' + MathLib.toString(this.numerator, {sign: true}).slice(0, 1) + '</mo>';
		numerator = MathLib.toMathML(MathLib.abs(this.numerator), passOptions);
	}
	else {
		numerator = MathLib.toMathML(this.numerator, passOptions);
	}

	return str
					+	'<mfrac>' 
					+ numerator
					+ MathLib.toMathML(this.denominator, passOptions)
					+ '</mfrac>';	
}