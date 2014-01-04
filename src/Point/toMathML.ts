/**
 * Returns (presentation) MathML representation of the point
 *
 * @param {boolean} opt Optional parameter to indicate if the output should be projective.  
 * @return {string}
 */
toMathML(opt = false) : string {
	var p = opt ? this.toArray() : this.normalize().slice(0, -1);

	return p.reduce(function (old, cur) {
		return old + '<mtr><mtd>' + MathLib.toMathML(cur) + '</mtd></mtr>';
	}, '<mrow><mo>(</mo><mtable>') + '</mtable><mo>)</mo></mrow>';
}