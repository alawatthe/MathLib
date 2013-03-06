// ### Matrix.prototype.toContentMathMLString()
// converting the matrix to content MathML
//
// *@returns {string}*
toContentMathMLString() {
	return this.reduce(function (str, x) {
		return str + x.reduce(function(prev, cur) {
			return prev + MathLib.toContentMathMLString(cur);
		}, '<matrixrow>') + '</matrixrow>';
	}, '<matrix>') + '</matrix>';
}