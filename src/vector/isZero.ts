// ### Vector.prototype.isZero()
// Determines if the vector is the zero vector.
//
// *@returns {boolean}*
isZero(v) {
  return this.every(MathLib.isZero);
}