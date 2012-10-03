// Calculates the hyperbolic cosine of a complex number
MathLib.extendPrototype('complex', 'cosh', function () {
  return MathLib.complex([MathLib.cos(this.im) * MathLib.cosh(this.re), MathLib.sin(this.im)*MathLib.sinh(this.re)]);
});