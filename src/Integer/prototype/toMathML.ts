/**
 * A presentation MathML string representation
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toMathML(options : toPresentationOptions = {}) : string {
	var base = options.base || 10,
			str = '<mn>'
					+ this.toString({base: base, sign: options.sign})
					+ '</mn>';

	if (options.baseSubscript) {
		str = '<msub>' + str + '<mn>' + base + '</mn></msub>';
	}
				
	return str;
}