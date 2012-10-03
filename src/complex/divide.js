// ### Complex.prototype.divide()
// Divides a complex number by an other
//
// *@param {number|complex}* The divisor  
// *@returns {complex}*
MathLib.extendPrototype('complex', 'divide', function (c) {
  return this.times(MathLib.inverse(c));
});