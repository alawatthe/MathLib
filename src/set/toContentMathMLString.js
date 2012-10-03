// ### Set.prototype.toContentMathMLString()
// Returns the content MathML representation of the set
//
// *@returns {string}*
MathLib.extendPrototype('set', 'toContentMathMLString', function () {
  if (this.isEmpty()) {
    return '<emptyset/>';
  }
  else {
    return this.reduce(function(old, cur) {
      return old + MathLib.toContentMathMLString(cur);
    }, '<set>') + '</set>';
  }
});