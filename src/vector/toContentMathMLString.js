// ### Vector.prototype.toContentMathMLString()
// Returns the content MathML representation of the vector
//
// *@returns {string}*
MathLib.extendPrototype('vector', 'toContentMathMLString', function () {
  return this.reduce(function (old, cur) {
    return old + MathLib.toContentMathMLString(cur);
  }, '<vector>') + '</vector>';
});