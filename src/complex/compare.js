// Compares two complex numbers
MathLib.extendPrototype('complex', 'compare', function (x) {
  var a = MathLib.sign(this.abs() - x.abs());
  return a ? a : MathLib.sign(this.arg() - x.arg());
});