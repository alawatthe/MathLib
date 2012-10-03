// ### Complex.prototype.negative()
// Calculates the negative of the complex number
//
// *@returns {complex}*
MathLib.extendPrototype('complex', 'negative', function () {
  return MathLib.complex([MathLib.negative(this.re), MathLib.negative(this.im)]);
});