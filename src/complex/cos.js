// Calculates the cosine of a complex number
MathLib.extendPrototype('complex', 'cos', function () {
  return MathLib.complex([MathLib.cos(this.re) * MathLib.cosh(this.im), -MathLib.sin(this.re)*MathLib.sinh(this.im)]);
});