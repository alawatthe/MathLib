// ### Vector.prototype.normalize()
// Normalizes the vector to have length one
//
// *@returns {vector}*
normalize() : Vector {
  return this.times(1 / this.size());
}