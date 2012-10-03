// ### Complex.prototype.inverse()
// Calculates the inverse of a complex number
//
// *@returns {complex}*
MathLib.extendPrototype('complex', 'inverse', function () {
  return MathLib.complex([MathLib.divide(this.re, MathLib.plus(MathLib.pow(this.re, 2), MathLib.pow(this.im, 2))),
    MathLib.divide(MathLib.negative(this.im), MathLib.plus(MathLib.pow(this.re, 2), MathLib.pow(this.im, 2)))]);
});