// ### Complex.prototype.exp()
// Evaluates the exponential function with complex argument
//
// *@returns {complex}*
MathLib.extendPrototype('complex', 'exp', function () {
  return MathLib.complex([MathLib.exp(this.re) * MathLib.cos(this.im), MathLib.exp(this.re)*MathLib.sin(this.im)]);
});