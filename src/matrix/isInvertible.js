// ### Matrix.prototype.isInvertible()
// Determines if the matrix is invertible.
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isInvertible', function () {
  return this.isSquare() && this.rank() === this.rows;
});