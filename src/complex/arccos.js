// Returns the inverse cosine of the number
MathLib.extendPrototype('complex', 'arccos', function () {
  return MathLib.minus(Math.PI/2, this.arcsin());
});