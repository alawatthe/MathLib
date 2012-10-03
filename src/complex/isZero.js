// ### Complex.prototype.isZero()
// Determines if the complex number is equal to 0.
//
// *@returns {boolean}*
MathLib.extendPrototype('complex', 'isZero', function () {
  return MathLib.isZero(this.re) && MathLib.isZero(this.im);
});