// ### Matrix.prototype.transpose()
// Calculating the transpose of the matrix
// The result is cached.
//
// *@returns {Matrix}*
transpose() : Matrix {
  var temp = [],
      transpose,
      help,
      i, j, ii, jj;

  for (i = 0, ii = this.cols; i<ii; i++) {
    help = [];
    for (j = 0, jj = this.rows; j<jj; j++) {
      help.push(this[j][i]);
    }
    temp.push(help);
  }

  transpose = new MathLib.Matrix(temp);
  this.transpose = function () {
    return transpose;
  };
  return transpose;
}