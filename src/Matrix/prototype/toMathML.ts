/**
 * converting the matrix to (presentation) MathML
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toMathML(options : toPresentationOptions = {}) : string {
	var passOptions = {base: options.base, baseSubscript: options.baseSubscript};

	return this.reduce(function (str, x) {
		return str
						+ '<mtr><mtd>'
						+ x.map(entry => MathLib.toMathML(entry, passOptions)).join('</mtd><mtd>')
						+ '</mtd></mtr>';
	}, '<mrow><mo> ( </mo><mtable>') + '</mtable><mo> ) </mo></mrow>';
}
