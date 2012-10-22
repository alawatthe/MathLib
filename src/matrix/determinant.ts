// ### Matrix.prototype.determinant()
// Calculates the determinant of the matrix via the LU decomposition.
// The result is cached.
//
// *@returns {number|complex}*
determinant() {
  if (this.isSquare()) {
    var arr, determinant;
    if(this.rank() < this.rows) {
      determinant = 0;
    }
    else {
      arr = this.LU();
      determinant = MathLib.times(this.LUpermutation.sgn(), MathLib.times.apply(null, arr.diag()));
    }

    this.determinant = function () {
      return determinant;
    };
    return determinant;
  }
}