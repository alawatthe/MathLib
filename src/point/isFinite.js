// ### Point.prototype.isFinite()
// Determines if the point is finite
//
// *@returns {boolean}*
MathLib.extendPrototype('point', 'isFinite', function (q) {
  return !MathLib.isZero(this[this.length - 1]);
});