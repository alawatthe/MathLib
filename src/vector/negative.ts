// ### Vector.prototype.negative()
// Returns the negative vector
//
// *@returns {Vector}*
negative() : Vector {
  return this.map(MathLib.negative);
}