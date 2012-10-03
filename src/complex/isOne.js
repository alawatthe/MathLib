// ### Complex.prototype.isOne()
// Determines if the complex number is equal to 1.
//
// *@returns {boolean}*
MathLib.extendPrototype('complex', 'isOne', function () {
  return MathLib.isOne(this.re) && MathLib.isZero(this.im);
});