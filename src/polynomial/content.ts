// ### Polynomial.prototype.content()
// Returns the content of the polynomial.
//
// *@returns {number|complex}*
content() {
  return MathLib.gcd(this);
}