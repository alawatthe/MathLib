// ### Matrix.prototype.rref()
// Calculate the reduced row echelon form (rref) of a matrix.
//
// *@returns {matrix}*
rref() {
  var lead = 0, rref = this.toArray(),
      i, j, r, temp, val;
  for (r = 0; r < this.rows; r++) {
    if (this.cols <= lead) {
      return new MathLib.Matrix(rref);
    }
    i = r;
    while (rref[i][lead] === 0) {
      i++;
      if (this.rows === i) {
        i = r;
        lead++;
        if (this.cols === lead) {
          return new MathLib.Matrix(rref);
        }
      }
    }

    // Switch the lines
    var tmp = rref[i];
    rref[i] = rref[r];
    rref[r] = tmp;

    val = rref[r][lead];
    for (j = 0; j < this.cols; j++) {
      rref[r][j] /= val;
    }

    for (i = 0; i < this.rows; i++) {
      if (i === r) {
        continue;
      }
      val = rref[i][lead];
      for (j = 0; j < this.cols; j++) {
        rref[i][j] = MathLib.minus(rref[i][j], MathLib.times(val, rref[r][j]));
      }
    }
    lead++;
  }
  return new MathLib.Matrix(rref);
}