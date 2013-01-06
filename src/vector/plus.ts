// ### Vector.prototype.plus()
// Calculates the sum of two vectors
//
// *@param {Vector}*  
// *@returns {Vector}*
plus(v : Vector) : Vector {
  if (this.length === v.length) {
    return new MathLib.Vector(this.map(function (x, i) {
      return MathLib.plus(x, v[i]);
    }));
  }
}