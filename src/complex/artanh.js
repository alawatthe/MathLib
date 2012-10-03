// Returns the inverse hyperbolic tangent of the number
MathLib.extendPrototype('complex', 'artanh', function () {
  return MathLib.times(0.5, MathLib.minus(MathLib.ln(MathLib.plus(1, this)), MathLib.ln(MathLib.minus(1, this))));
});