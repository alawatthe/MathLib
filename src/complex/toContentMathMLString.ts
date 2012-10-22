// ### Complex.prototype.toContentMathMLString()
// Returns the content MathML representation of the number
//
// *@returns {string}*
toContentMathMLString() {
  return '<cn type="complex-cartesian">' + this.re + '<sep/>' + this.im + '</cn>';
}