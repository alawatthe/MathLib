// ### Polynomial.prototype.isPrimitive()
// Decides if the polynomial is primitive
//
// *@returns {boolean}*
MathLib.extendPrototype('polynomial', 'isPrimitive', function () {
  return MathLib.gcd(this) === 1;
});