// ### Matrix.prototype.isReal()
// Determines if the matrix has only real entries
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isReal', function () {
  return this.every(MathLib.isReal);
});