// ### Polynomial.prototype.isReal()
// Checks wether the coefficients are real numbers
//
// *@returns {boolean}*
MathLib.extendPrototype('polynomial', 'isReal', function () {
  return this.every(MathLib.isReal);
});