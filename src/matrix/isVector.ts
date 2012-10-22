// ### Matrix.prototype.isVector()
// Determines if the matrix is a vector
// (only one row or one column)
//
// *@returns {boolean}*
isVector() {
  return (this.rows === 1) || (this.cols === 1);
}