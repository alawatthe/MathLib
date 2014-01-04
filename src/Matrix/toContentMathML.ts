/**
 * converting the matrix to content MathML
 *
 * @return {string}
 */
toContentMathML() : string {
	return this.reduce(function (str, x) {
		return str + x.reduce(function (prev, cur) {
			return prev + MathLib.toContentMathML(cur);
		}, '<matrixrow>') + '</matrixrow>';
	}, '<matrix>') + '</matrix>';
}