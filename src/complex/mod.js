// ### Complex.prototype.mod()
// Reduces the real and imaginary part mod a number
//
// *@param {number}*  
// *@returns {complex}*
MathLib.extendPrototype('complex', 'mod', function (m) {
  return MathLib.complex([MathLib.mod(this.re, m), MathLib.mod(this.im, m)]);
});