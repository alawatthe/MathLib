/**
 * A LaTeX string representation
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toLaTeX(options : toPresentationOptions = {}) : string {
	var option, str,
			base = options.base || 10,
			passOptions = {};

	for (option in options) {
		if (options.hasOwnProperty(option) && option !== 'baseSubscript') {
			passOptions[option] = options[option];
		}
	}

	str = this.toString(passOptions);

	if (options.baseSubscript) {
		str += '_{' + base + '}';
	}

	return str;
}
