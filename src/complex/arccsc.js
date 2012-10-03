// Returns the inverse cosecant of the number
MathLib.extendPrototype('complex', 'arccsc', function () {
  return MathLib.times(MathLib.complex([0, 1]), MathLib.ln(MathLib.plus(MathLib.sqrt(MathLib.minus(1, MathLib.divide(1, MathLib.times(this, this)))) , MathLib.divide(MathLib.complex([0, 1]), this))));
});