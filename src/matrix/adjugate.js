// ### Matrix.prototype.adjugate()
// Calculates the adjugate matrix
//
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'adjugate', function (n) {
  return this.map(function (x, r, c, m) {
    return MathLib.times(m.remove(c, r).determinant(), 1 - ((r+c)%2) * 2);
  });
});