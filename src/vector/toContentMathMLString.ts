// ### Vector.prototype.toContentMathMLString()
// Returns the content MathML representation of the vector
//
// *@returns {string}*
toContentMathMLString() {
  return this.reduce(function (old, cur) {
    return old + MathLib.toContentMathMLString(cur);
  }, '<vector>') + '</vector>';
}