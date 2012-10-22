// ### Vector.prototype.scalarProduct()
// Calculates the scalar product of two vectors
//
// *@param {vector}*  
// *@returns {number|complex}*
scalarProduct(v) {
  return this.reduce(function (old, cur, i, w) {
    return MathLib.plus(old, MathLib.times(w[i], v[i]));
  }, 0);
}