// ### Complex.prototype.pow()
// Calculates the n-th pow of the complex number
//
// *@param {number}* The pow to which the complex number should be raised   
// *@returns {complex}*
MathLib.extendPrototype('complex', 'pow', function (n) {
  return MathLib.complex(Math.pow(this.abs(), n), n * this.arg());
});