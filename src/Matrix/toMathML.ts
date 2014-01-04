/**
 * converting the matrix to (presentation) MathML
 *
 * @return {string}
 */
toMathML() : string {
	return this.reduce(function (str, x) {
		return str + x.reduce(function (prev, cur) {
			return prev + '<mtd>' + MathLib.toMathML(cur) + '</mtd>';
		}, '<mtr>') + '</mtr>';
	}, '<mrow><mo> ( </mo><mtable>') + '</mtable><mo> ) </mo></mrow>';
}