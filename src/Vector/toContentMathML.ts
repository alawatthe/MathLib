/**
 * Returns the content MathML representation of the vector.
 *
 * @return {string}
 */
toContentMathML() : string {
	return this.reduce(function (old, cur) {
		return old + MathLib.toContentMathML(cur);
	}, '<vector>') + '</vector>';
}