// ### Matrix.prototype.toLaTeX()
// Converting the matrix to LaTeX
//
// *@return {string}*
toLaTeX() : string {
	return '\\begin{pmatrix}\n' + this.reduce(function (str, x) {
		return str + x.reduce(function (prev, cur) {
			return prev + ' & ' + MathLib.toLaTeX(cur);
		}) + '\\\n';
	}, '').slice(0, -2) + '\n\\end{pmatrix}';
}