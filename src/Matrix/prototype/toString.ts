/**
 * Creating a custom .toString() function
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toString(options : toPresentationOptions = {}) : string {
	var passOptions = {base: options.base, baseSubscript: options.baseSubscript};

	return this.reduce(function (str, x) {
		return str
						+ x.map(entry => MathLib.toString(entry, passOptions)).join('\t')
						+ '\n';
	}, '').slice(0, -1);
}