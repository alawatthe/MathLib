// ### Matrix.prototype.isSymmetric()
// Determines if the matrix is symmetric
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isSymmetric', function () {
  var i, j, bool = true;
  if (!this.isSquare()) {
    bool = false;
  }
  else {
lp: for (i = 0; i < this.rows; i++) {
      for (j = i + 1; j < this.cols; j++) {
        if (!MathLib.isEqual(this[i][j], this[j][i])) {
          bool = false;
          break lp;
        }
      }
    }
  }

  this.isSymmetric = function () {
    return bool;
  };
  return bool;
});