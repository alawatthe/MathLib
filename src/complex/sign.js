// ### Complex.prototype.sign()
// Calculates the signum of a complex number
//
// *@returns {complex}*
MathLib.extendPrototype('complex', 'sign', function () {
  return MathLib.complex(1, this.arg());
});