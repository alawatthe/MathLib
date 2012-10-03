// ### Complex.prototype.times()
// Multiplies complex numbers
//
// *@param {complex}* The number to be added  
// *@returns {complex}*
MathLib.extendPrototype('complex', 'times', function (c) {
  if (c.type === "complex") {
    return MathLib.complex([MathLib.minus(MathLib.times(this.re, c.re), MathLib.times(this.im, c.im)),
        MathLib.plus(MathLib.times(this.re, c.im), MathLib.times(this.im, c.re))]);
  }
  else if (typeof c === "number") {
    return MathLib.complex([MathLib.times(this.re, c), MathLib.times(this.im, c)]);
  }
});