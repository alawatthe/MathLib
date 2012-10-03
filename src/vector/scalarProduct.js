// ### Vector.prototype.scalarProduct()
// Calculates the scalar product of two vectors
//
// *@param {vector}*  
// *@returns {number|complex}*
MathLib.extendPrototype('vector', 'scalarProduct', function (v) {
  return this.reduce(function (old, cur, i, w) {
    return MathLib.plus(old, MathLib.times(w[i], v[i]));
  }, 0);
});