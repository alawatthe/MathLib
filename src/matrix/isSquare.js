// ### Matrix.prototype.isSquare()
// Determines if the matrix is a square matrix
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isSquare', function () {
  return this.cols === this.rows;
});