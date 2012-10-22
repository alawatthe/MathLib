// ### Matrix.prototype.isZero()
// Determines if the matrix the zero matrix
// The result is cached.
//
// *@returns {boolean}*
isZero() {
  var isZero = this.every(MathLib.isZero);

  this.isZero = function () {
    return isZero;
  };
  return isZero;
}