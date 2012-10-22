// ### Vector.prototype.outerProduct()
// Calculates the outer product of two vectors.
//
// *@param {vector}*  
// *@returns {matrix}*
outerProduct(v) {
  return new MathLib.Matrix(this.map(function (x) {
    return v.map(function (y) {
      return MathLib.times(x, y);
    });
  }));
}