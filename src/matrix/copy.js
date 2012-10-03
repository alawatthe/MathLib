// ### Matrix.prototype.copy()
// Copies the matrix
//
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'copy', function () {
  return this.map(MathLib.copy);
});