// ### Polynomial.prototype.content()
// Returns the content of the polynomial.
//
// *@returns {number|complex}*
MathLib.extendPrototype('polynomial', 'content', function () {
  return MathLib.gcd(this);
});