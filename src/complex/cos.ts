// Calculates the cosine of a complex number
cos() {
  return new MathLib.Complex(MathLib.cos(this.re) * MathLib.cosh(this.im), -MathLib.sin(this.re)*MathLib.sinh(this.im));
}