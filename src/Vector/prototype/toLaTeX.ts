/**
 * Returns a LaTeX representation of the vector.
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toLaTeX(options : toPresentationOptions = {}) : string {
	return '\\begin{pmatrix}\n\t' + this.reduce(function (old, cur) {
		return old + '\\\\\n\t' + MathLib.toLaTeX(cur, options);
	}) + '\n\\end{pmatrix}';
}