// ### Vector.prototype.isZero()
// Determines if the vector is the zero vector.
//
// *@returns {boolean}*
isZero() : bool {
  return this.every(MathLib.isZero);
}