// ### [Vector.prototype.toLaTeX()](http://mathlib.de/en/docs/Vector/toLaTeX)
// Returns a LaTeX representation of the vector.
//
// *@returns {string}*
toLaTeX() : string {
	return '\\begin{pmatrix}\n\t' + this.reduce(function (old, cur) {
		return old + '\\\\\n\t' + MathLib.toLaTeX(cur);
	}) + '\n\\end{pmatrix}';
}