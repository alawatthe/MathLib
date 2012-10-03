// ### Complex.prototype.toMatrix()
// Transforms the complex number to a 2x2 matrix
//
// *@returns {matrix}*
MathLib.extendPrototype('complex', 'toMatrix', function () {
  return MathLib.matrix([[this.re, MathLib.negative(this.im)], [this.im, this.re]]);
});