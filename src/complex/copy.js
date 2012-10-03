// Copies the complex number
MathLib.extendPrototype('complex', 'copy', function () {
  return MathLib.complex([MathLib.copy(this.re), MathLib.copy(this.im)]);
});