// ### Complex.prototype.sin()
// Calculates the sine of a complex number
//
// *@returns {complex}*
MathLib.extendPrototype('complex', 'sin', function () {
  return MathLib.complex([MathLib.sin(this.re) * MathLib.cosh(this.im), MathLib.cos(this.re)*MathLib.sinh(this.im)]);
});