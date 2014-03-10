/**
 * Returns a content MathML representation of the function
 *
 * @return {MathML}
 */
functnPrototype.toContentMathML = function () {
	return this.expression.toContentMathML();
};