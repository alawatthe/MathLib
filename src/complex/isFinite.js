// ### Complex.prototype.isFinite()
// Determines if the complex number is finite.
//
// *@returns {boolean}*
MathLib.extendPrototype('complex', 'isFinite', function () {
  return MathLib.isFinite(this.re) && MathLib.isFinite(this.im);
});