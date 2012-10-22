// ### Polynomial.prototype.isPrimitive()
// Decides if the polynomial is primitive
//
// *@returns {boolean}*
isPrimitive() {
  return MathLib.gcd(this) === 1;
}