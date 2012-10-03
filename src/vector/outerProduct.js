// ### Vector.prototype.outerProduct()
// Calculates the outer product of two vectors.
//
// *@param {vector}*  
// *@returns {matrix}*
MathLib.extendPrototype('vector', 'outerProduct', function (v) {
  return MathLib.matrix(this.map(function (x) {
    return v.map(function (y) {
      return MathLib.times(x, y);
    });
  }));
});