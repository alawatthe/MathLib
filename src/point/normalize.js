// ### Point.prototype.normalize()
// Normalizes the point.
// (Making the last component 1)
//
// *@returns {point}*
MathLib.extendPrototype('point', 'normalize', function (q) {
  var last = this[this.dim];
  return this.map(function (x) {
    return x / last;
  });
});