// ### Point.prototype.normalize()
// Normalizes the point.
// (Making the last component 1)
//
// *@returns {point}*
normalize() : Point {
  var last = this[this.dim];
  return this.map(function (x) {
    return x / last;
  });
}