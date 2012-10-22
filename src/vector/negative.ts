// ### Vector.prototype.negative()
// Returns the negative vector
//
// *@returns {vector}*
negative() {
  return this.map(MathLib.negative);
}