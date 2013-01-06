// ### Matrix.prototype.cholesky()
// The cholesky decomposition of a matrix
// using the Cholesky–Banachiewicz algorithm.
// Does not change the current matrix, but returns a new one.
// The result is cached.
//
// *@returns {Matrix}*
cholesky() : Matrix {
  var r, rr, temp = [], k, kk, sum, c, cholesky;

  for (r = 0, rr = this.rows; r < rr; r++) {
    temp.push([]);
  }

  for (r = 0, rr = this.rows; r < rr; r++) {
    for (c=0; c<r; c++) {
      sum = 0;
      for (k = 0, kk = c; k < kk; k++) {
        sum = MathLib.plus(sum, MathLib.times(temp[r][k], temp[c][k]));
      }
      temp[r][c] = (this[r][c] - sum)/temp[c][c];
    }

    sum = 0;
    for (k = 0, kk = c; k < kk; k++) {
      sum = MathLib.plus(sum, MathLib.times(temp[r][k], temp[r][k]));
    }
    temp[r][c] = Math.sqrt(this[c][c] - sum);

    for (c++; c < this.cols; c++) {
      temp[r][c] = 0;
    }

  }
  cholesky = new MathLib.Matrix(temp);

  this.cholesky = function () {
    return cholesky;
  };
  return cholesky;
}