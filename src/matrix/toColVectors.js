// ### Matrix.prototype.toColVectors()
// Converts the columns of the matrix to vectors
//
// *@returns {array}*
MathLib.extendPrototype('matrix', 'toColVectors', function () {
  return this.transpose().toRowVectors();
});