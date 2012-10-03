// ### Line.prototype.isFinite()
// Determines if the line is finite
//
// *@returns {boolean}*
MathLib.extendPrototype('line', 'isFinite', function (q) {
  return !MathLib.isZero(this[this.length - 1]);
});