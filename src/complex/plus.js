// ### Complex.prototype.plus()
// Add complex numbers
//
// *@param {complex}* The number to be added  
// *@returns {complex}*
MathLib.extendPrototype('complex', 'plus', function (c) {
  if (c.type === "complex") {
    return MathLib.complex([MathLib.plus(this.re, c.re), MathLib.plus(this.im, c.im)]);
  }
  else if (typeof c === "number") {
    return MathLib.complex([MathLib.plus(this.re, c), this.im]);
  }
});