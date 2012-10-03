// ### Polynomial.prototype.negative()
// Returns the negative polynomial
//
// *@returns {polynomial}*
MathLib.extendPrototype('polynomial', 'negative', function () {
  return MathLib.polynomial(this.map(MathLib.negative));
});