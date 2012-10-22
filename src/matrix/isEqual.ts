// ### Matrix.prototype.isEqual()
// Determines if the matrix is equal to an other matrix.
//
// *@param {matrix}* the matrix to compare with  
// *@returns {boolean}*
isEqual(x) {
  var i, j, ii, jj;
  if (this === x) {
    return true;
  }
  if (this.rows === x.rows && this.cols === x.cols) {
    for (i = 0, ii = this.rows; i < ii; i++) {
      for (j = 0, jj = this.cols; j < jj; j++) {
        if (!MathLib.isEqual(this[i][j], x[i][j])) {
          return false;
        }
      }
    }
    return true;
  }
  return false;
}