// ### Point.prototype.toComplex()
// Converts a two dimensional point to the corresponding complex number.
//
// *@returns {complex}*
toComplex() : Complex {
  if (this.dim === 2) {
    return new MathLib.Complex(this[0]/this[2], this[1]/this[2]);
  }
}