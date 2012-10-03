// ### Vector.prototype.minus()
// Calculates the difference of two vectors
//
// *@param {vector}* The vector to be subtracted.  
// *@returns {vector}*
MathLib.extendPrototype('vector', 'minus', function (m) {
  return this.plus(m.negative());
});