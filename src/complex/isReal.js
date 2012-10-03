// ### Complex.prototype.isReal()
// Determines if the complex number is real.
//
// *@returns {boolean}*
MathLib.extendPrototype('complex', 'isReal', function () {
  return MathLib.isZero(this.im);
});