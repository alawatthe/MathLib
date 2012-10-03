// ### Vector.prototype.conjugate()
// Calculates the conjugate of a vector
//
// *@returns {vector}*
MathLib.extendPrototype('vector', 'conjugate', function () {
  return MathLib.vector(this.map(MathLib.conjugate));
});