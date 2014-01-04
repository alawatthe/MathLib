/**
 * Returns the content MathML representation of the set
 *
 * @return {string}
 */
toContentMathML() : string {
	if (this.isEmpty()) {
		return '<emptyset/>';
	}
	else {
		return this.reduce(function (old, cur) {
			return old + MathLib.toContentMathML(cur);
		}, '<set>') + '</set>';
	}
}