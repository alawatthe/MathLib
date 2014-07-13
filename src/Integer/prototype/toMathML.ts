/**
 * A presentation MathML string representation
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toMathML(options : toPresentationOptions = {}) : string {
	var str, option,
			base = options.base || 10,
			passOptions = {};

	for (option in options) {
		if (options.hasOwnProperty(option) && option !== 'baseSubscript') {
			passOptions[option] = options[option];
		}
	}

	str = '<mn>'
			+ this.toString(passOptions)
			+ '</mn>';

	if (options.baseSubscript) {
		str = '<msub>' + str + '<mn>' + base + '</mn></msub>';
	}

	return str;
}
