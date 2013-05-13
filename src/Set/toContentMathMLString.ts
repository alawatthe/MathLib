// ### Set.prototype.toContentMathMLString()
// Returns the content MathML representation of the set
//
// *@return {string}*
toContentMathMLString() : string {
	if (this.isEmpty()) {
		return '<emptyset/>';
	}
	else {
		return this.reduce(function (old, cur) {
			return old + MathLib.toContentMathMLString(cur);
		}, '<set>') + '</set>';
	}
}