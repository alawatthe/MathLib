// Returns the inverse cotangent of the number
MathLib.extendPrototype('complex', 'arccot', function () {
  return MathLib.minus(Math.PI/2, this.arctan());
});