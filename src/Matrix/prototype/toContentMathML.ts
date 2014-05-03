/**
 * converting the matrix to content MathML
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toContentMathML(options : toContentMathMLOptions = {}) : string {
	if (options.strict) {
		return this.reduce(function (str, x) {
			return str
							+ '<apply><csymbol cd="linalg2">matrixrow</csymbol>'
							+ x.map(entry => MathLib.toContentMathML(entry, options)).join('')
							+ '</apply>';
		}, '<apply><csymbol cd="linalg2">matrix</csymbol>') + '</apply>';
	}
	else {
		return this.reduce(function (str, x) {
			return str
							+ '<matrixrow>'
							+ x.map(entry => MathLib.toContentMathML(entry, options)).join('')
							+ '</matrixrow>';
		}, '<matrix>') + '</matrix>';
	}
}