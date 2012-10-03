// ### Complex.prototype.sinh()
// Calculates the hyperbolic sine of a complex number
//
// *@returns {complex}*
MathLib.extendPrototype('complex', 'sinh', function () {
  return MathLib.complex([MathLib.cos(this.im) * MathLib.sinh(this.re), MathLib.sin(this.im)*MathLib.cosh(this.re)]);
});