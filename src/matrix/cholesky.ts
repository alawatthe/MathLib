// ### Matrix.prototype.cholesky()
// The cholesky decomposition of a matrix
// using the Cholesky–Banachiewicz algorithm.
// Does not change the current matrix, but returns a new one.
// The result is cached.
//
// *@returns {matrix}*
cholesky() {
  var r, rr, cholesky = [], k, kk, sum, c;

  for (r = 0, rr = this.rows; r < rr; r++) {
    cholesky.push([]);
  }

  for (r = 0, rr = this.rows; r < rr; r++) {
    for (c=0; c<r; c++) {
      sum = 0;
      for (k = 0, kk = c; k < kk; k++) {
        sum = MathLib.plus(sum, MathLib.times(cholesky[r][k], cholesky[c][k]));
      }
      cholesky[r][c] = (this[r][c] - sum)/cholesky[c][c];
    }

    sum = 0;
    for (k = 0, kk = c; k < kk; k++) {
      sum = MathLib.plus(sum, MathLib.times(cholesky[r][k], cholesky[r][k]));
    }
    cholesky[r][c] = Math.sqrt(this[c][c] - sum);

    for (c++; c < this.cols; c++) {
      cholesky[r][c] = 0;
    }

  }
  cholesky = new MathLib.Matrix(cholesky);

  this.cholesky = function () {
    return cholesky;
  };
  return cholesky;
}