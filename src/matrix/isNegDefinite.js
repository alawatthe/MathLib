// ### Matrix.prototype.isNegDefinite()
// Determines if the matrix is negative definite
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isNegDefinite', function () {
  if (!this.isSquare()) {
    return;
  }
  if (this.rows === 1) {
    return this[0][0] < 0;
  }
  // Sylvester's criterion
  if (this.rows % 2 === 0) {
    return this.determinant() > 0 && this.remove(this.rows-1, this.cols-1).isNegDefinite();
  }
  else {
    return this.determinant() < 0 && this.remove(this.rows-1, this.cols-1).isNegDefinite();
  }
});