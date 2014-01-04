/**
 * Returns the (presentation) MathML representation of the vector.
 *
 * @return {string}
 */
toMathML() : string {
	return this.reduce(function (old, cur) {
		return old + '<mtr><mtd>' + MathLib.toMathML(cur) + '</mtd></mtr>';
	}, '<mrow><mo>(</mo><mtable>') + '</mtable><mo>)</mo></mrow>';
}