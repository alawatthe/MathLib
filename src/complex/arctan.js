// Returns the inverse cotangent of the number
MathLib.extendPrototype('complex', 'arctan', function () {
  var z = MathLib.complex(-this.im, this.re);
  return MathLib.times(MathLib.complex([0, 0.5]), MathLib.ln(MathLib.divide( MathLib.plus(1, z), MathLib.minus(1, z))));
});