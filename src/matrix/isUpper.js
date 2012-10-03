// ### Matrix.prototype.isUpper()
// Determines if the matrix is a upper triangular matrix
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isUpper', function () {
  return this.slice(1).every(function (x, i) {
    return x.slice(0, i+1).every(MathLib.isZero);
  });
});