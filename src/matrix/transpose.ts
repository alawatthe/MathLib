// ### Matrix.prototype.transpose()
// Calculating the transpose of the matrix
// The result is cached.
//
// *@returns {matrix}*
transpose() {
  var transpose = [],
      help,
      i, j, ii, jj;

  for (i = 0, ii = this.cols; i<ii; i++) {
    help = [];
    for (j = 0, jj = this.rows; j<jj; j++) {
      help.push(this[j][i]);
    }
    transpose.push(help);
  }

  transpose = new MathLib.Matrix(transpose);
  this.transpose = function () {
    return transpose;
  };
  return transpose;
}