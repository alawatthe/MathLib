// ### Complex.prototype.toContentMathMLString()
// Returns the content MathML representation of the number
//
// *@return {string}*
toContentMathMLString() : String {
	return '<cn type="complex-cartesian">' + this.re + '<sep/>' + this.im + '</cn>';
}