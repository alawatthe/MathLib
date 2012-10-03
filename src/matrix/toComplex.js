// ### Matrix.prototype.toComplex()
// Transforms a 2x2 matrix into the corresponding complex number
// (if the entries allow the transformation)
//
// *@returns {complex}*
MathLib.extendPrototype('matrix', 'toComplex', function () {
  if (this.rows !== 2 || this.cols !== 2 || this[0][0] !== this[1][1] || this[0][1] !== MathLib.negative(this[1][0])) {
    return;
  }
  return MathLib.complex([this[0][0], this[1][0]]);
});