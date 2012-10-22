// Returns the inverse sine of the number
arcsin() {
  var a = this.re, b = this.im;
  return new MathLib.Complex(
     MathLib.sign(a)/2 * MathLib.arccos(Math.sqrt(Math.pow(a*a + b*b - 1, 2) +4*b*b) - (a*a + b*b)),
     MathLib.sign(b)/2 * MathLib.arcosh(Math.sqrt(Math.pow(a*a + b*b - 1, 2) +4*b*b) + (a*a + b*b))
    );
}