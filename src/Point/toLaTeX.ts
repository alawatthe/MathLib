/**
 * Returns LaTeX representation of the point
 *
 * @param {boolean} opt Optional parameter to indicate if the output should be projective.  
 * @return {string}
 */
toLaTeX(opt = false) : string {
	var p = opt ? this.toArray() : this.normalize().slice(0, -1);

	return '\\begin{pmatrix}' + p.reduce(function (old, cur) {
		return old + '\\\\' + MathLib.toLaTeX(cur);
	}) + '\\end{pmatrix}';
}