// ### Matrix.prototype.isInvertible()
// Determines if the matrix is invertible.
//
// *@returns {boolean}*
isInvertible() {
  return this.isSquare() && this.rank() === this.rows;
}