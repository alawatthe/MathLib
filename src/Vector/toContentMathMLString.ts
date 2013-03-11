// ### [Vector.prototype.toContentMathMLString()](http://mathlib.de/en/docs/vector/toContentMathMLString)
// Returns the content MathML representation of the vector.
//
// *@returns {string}*
toContentMathMLString() : string {
	return this.reduce(function (old, cur) {
		return old + MathLib.toContentMathMLString(cur);
	}, '<vector>') + '</vector>';
}