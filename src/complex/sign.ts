// ### Complex.prototype.sign()
// Calculates the signum of a complex number
//
// *@returns {complex}*
sign() {
  return MathLib.Complex.polar(1, this.arg());
}