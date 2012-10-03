// ### Vector.prototype.plus()
// Calculates the sum of two vectors
//
// *@param {vector}*  
// *@returns {vector}*
MathLib.extendPrototype('vector', 'plus', function (v) {
  if (this.length === v.length) {
    return MathLib.vector(this.map(function (x, i) {
      return MathLib.plus(x, v[i]);
    }));
  }
});