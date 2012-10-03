// ### Matrix.prototype.solve()
// Solves the system of linear equations Ax = b
// given by the matrix A and a vector or point b.
//
// *@param {vector|point}* The b in Ax = b  
// *@returns {vector|point}*
MathLib.extendPrototype('matrix', 'solve', function (b) {
  // Ax = b -> LUx = b. Then y is defined to be Ux
  var LU = this.LU(),
      i, j,
      n = b.length,
      x = [],
      y = [];

  // Permutate b according to the LU decomposition
  b = this.LUpermutation.applyTo(b);


  // Forward solve Ly = b
  for (i = 0; i < n; i++) {
    y[i] = b[i];
    for (j = 0; j < i; j++) {
      y[i] = MathLib.minus(y[i], MathLib.times(LU[i][j], y[j]));
    }
  }

  // Backward solve Ux = y
  for (i = n - 1; i >= 0; i--) {
    x[i] = y[i];
    for (j = i + 1; j < n; j++) {
      x[i] = MathLib.minus(x[i], MathLib.times(LU[i][j], x[j]));
    }
    x[i] = MathLib.divide(x[i], LU[i][i]);
  }

  return b.constructor(x);
});