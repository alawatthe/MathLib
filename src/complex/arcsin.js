// Returns the inverse sine of the number
MathLib.extendPrototype('complex', 'arcsin', function () {
  var a = this.re, b = this.im;
  return MathLib.complex([
     MathLib.sign(a)/2 * MathLib.arccos(Math.sqrt(Math.pow(a*a + b*b - 1, 2) +4*b*b) - (a*a + b*b)),
     MathLib.sign(b)/2 * MathLib.arcosh(Math.sqrt(Math.pow(a*a + b*b - 1, 2) +4*b*b) + (a*a + b*b))
    ]);
});