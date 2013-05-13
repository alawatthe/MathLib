// ### [Vector.prototype.toContentMathMLString()](http://mathlib.de/en/docs/Vector/toContentMathMLString)
// Returns the content MathML representation of the vector.
//
// *@return {string}*
toContentMathMLString() : string {
	return this.reduce(function (old, cur) {
		return old + MathLib.toContentMathMLString(cur);
	}, '<vector>') + '</vector>';
}