// ### Matrix.prototype.minus()
// Calculates the difference of two matrices
//
// *@param {matrix}* The matrix to be subtracted.  
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'minus', function (m) {
  return this.plus(m.negative());
});