// ### Line.prototype.normalize()
// Normalizes the line.
// (Making the last component 1)
//
// *@returns {line}*
normalize() : Line {
  var last = this[this.dim];
  return this.map(function (x) {
    return x / last;
  });
}