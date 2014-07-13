/**
 * Converting the matrix to LaTeX
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toLaTeX(options : toPresentationOptions = {}) : string {
	var passOptions = {base: options.base, baseSubscript: options.baseSubscript};

	return '\\begin{pmatrix}\n' + this.reduce(function (str, x) {
		return str
						+ x.map(entry => MathLib.toLaTeX(entry, passOptions)).join(' & ')
						+ '\\\n';
	}, '').slice(0, -2) + '\n\\end{pmatrix}';
}
