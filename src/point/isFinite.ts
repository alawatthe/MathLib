// ### Point.prototype.isFinite()
// Determines if the point is finite
//
// *@returns {boolean}*
isFinite(q) {
  return !MathLib.isZero(this[this.length - 1]);
}