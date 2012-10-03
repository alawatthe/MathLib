// ### Complex.prototype.ln()
// Evaluates the natural logarithm with complex arguments
//
// *@returns {complex}*
MathLib.extendPrototype('complex', 'ln', function () {
  return MathLib.complex([MathLib.ln(this.abs()), this.arg()]);
});