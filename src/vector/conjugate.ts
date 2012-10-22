// ### Vector.prototype.conjugate()
// Calculates the conjugate of a vector
//
// *@returns {vector}*
conjugate() {
  return new MathLib.Vector(this.map(MathLib.conjugate));
}