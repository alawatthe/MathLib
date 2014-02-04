/**
 * A LaTeX string representation
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toLaTeX(options : toPresentationOptions = {}) : string {
	var base = options.base || 10,
			str = this.toString({base: base, sign: options.sign});
	
	if (options.baseSubscript) {
		str += '_{' + base + '}';
	}
	
	return str;
}