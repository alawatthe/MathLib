// Returns the inverse cosecant of the number
arccsc() {
  return MathLib.times(new MathLib.Complex(0, 1), MathLib.ln(MathLib.plus(MathLib.sqrt(MathLib.minus(1, MathLib.divide(1, MathLib.times(this, this)))) , MathLib.divide(new MathLib.Complex(0, 1), this))));
}