// ### Vector.prototype.minus()
// Calculates the difference of two vectors
//
// *@param {Vector}* The vector to be subtracted.  
// *@returns {Vector}*
minus(v : Vector) {
  return this.plus(v.negative());
}