// ### Set.prototype.toLaTeX()
// Returns the LaTeX representation of the set
//
// *@return {string}*
toLaTeX() : string {
	if (this.isEmpty()) {
		return '\\emptyset';
	}
	else {
		return this.reduce(function (old, cur) {
			return old + MathLib.toLaTeX(cur) + ', ';
		}, '\\{').slice(0, -2) + '\\}';
	}
}