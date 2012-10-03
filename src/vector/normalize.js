// ### Vector.prototype.normalize()
// Normalizes the vector to have length one
//
// *@returns {vector}*
MathLib.extendPrototype('vector', 'normalize', function () {
  return this.times(1 / this.size());
});