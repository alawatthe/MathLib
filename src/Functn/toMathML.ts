/**
 * Returns a MathML representation of the function
 *
 * @return {string}
 */
functnPrototype.toMathML = function () {
	return this.expression.toMathML();
};