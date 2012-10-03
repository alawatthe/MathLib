// Returns the absolute value of the number
MathLib.extendPrototype('complex', 'abs', function (x) {
  return MathLib.hypot(this.re, this.im);
});