// ### Complex.prototype.negative()
// Calculates the negative of the complex number
//
// *@returns {complex}*
negative() {
  return new MathLib.Complex(MathLib.negative(this.re), MathLib.negative(this.im));
}