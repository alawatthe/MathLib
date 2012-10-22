// ### Vector.prototype.minus()
// Calculates the difference of two vectors
//
// *@param {vector}* The vector to be subtracted.  
// *@returns {vector}*
minus(m) {
  return this.plus(m.negative());
}