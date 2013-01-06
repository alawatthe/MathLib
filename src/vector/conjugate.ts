// ### Vector.prototype.conjugate()
// Calculates the conjugate of a vector
//
// *@returns {Vector}*
conjugate() : Vector {
  return new MathLib.Vector(this.map(MathLib.conjugate));
}