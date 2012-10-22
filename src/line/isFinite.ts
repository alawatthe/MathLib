// ### Line.prototype.isFinite()
// Determines if the line is finite
//
// *@returns {boolean}*
isFinite(q) {
  return !MathLib.isZero(this[this.length - 1]);
}