// ### Matrix.prototype.plus()
// This function adds a matrix to the current matrix
// and returns the result as a new matrix.
//
// *@param {matrix}* The matrix to be added.  
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'plus', function (m) {
  var res = [],
      r = this.rows,
      c = this.cols,
      i, j;

  for (i = 0; i < r; i++) {
    res[i] = [];
    for (j = 0; j < c; j++) {
      res[i][j] = MathLib.plus(this[i][j], m[i][j]);
    }
  }
  return MathLib.matrix(res);
});