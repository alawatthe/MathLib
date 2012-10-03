// ### Matrix.prototype.divide()
// Multiplies the matrix by the inverse of a number or a matrix
//
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'divide', function (n) {
  return this.times(MathLib.inverse(n));
});