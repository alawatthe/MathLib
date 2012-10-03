// ### Matrix.prototype.toRowVectors()
// Converts the rows of the matrix to vectors
//
// *@returns {array}*
MathLib.extendPrototype('matrix', 'toRowVectors', function () {
  return this.toArray().map(MathLib.vector);
});