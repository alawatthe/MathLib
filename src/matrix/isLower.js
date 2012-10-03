// ### Matrix.prototype.isLower()
// Determines if the matrix is a lower triangular matrix.
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isLower', function () {
  return this.slice(0, -1).every(function (x, i) {
    return x.slice(i+1).every(MathLib.isZero);
  });
});