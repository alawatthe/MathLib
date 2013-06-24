// ### Complex.prototype.toContentMathML()
// Returns the content MathML representation of the number
//
// *@return {string}*
toContentMathML() : string {
	return '<cn type="complex-cartesian">' + this.re + '<sep/>' + this.im + '</cn>';
}