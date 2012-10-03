// Calculates the conjugate of a complex number
MathLib.extendPrototype('complex', 'conjugate', function () {
  return MathLib.complex([this.re, MathLib.negative(this.im)]);
});