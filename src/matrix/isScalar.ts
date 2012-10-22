// ### Matrix.prototype.isScalar()
// Determines if the matrix is a scalar matrix
// (that is a multiple of the scalar matrix)
//
// *@returns {boolean}*
isScalar() {
  var n = this.rows,
      diag = this.diag,
      i;
  if (this.hasOwnProperty('isIdentity') && this.hasOwnProperty('isZero')) {
    if (this.isIdentity() || this.isZero()) {
      return true;
    }
    else {
      return false;
    }
  }
  if (this.isDiag()) {
    for (i = 1; i < n; i++) {
      if (!MathLib.isEqual(diag[0], diag[i])) {
        return false;
      }
    }
    return true;
  }
  return false;
}