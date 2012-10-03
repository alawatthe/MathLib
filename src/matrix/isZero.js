// ### Matrix.prototype.isZero()
// Determines if the matrix the zero matrix
// The result is cached.
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isZero', function () {
  var isZero = this.every(MathLib.isZero);

  this.isZero = function () {
    return isZero;
  };
  return isZero;
});