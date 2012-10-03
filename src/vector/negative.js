// ### Vector.prototype.negative()
// Returns the negative vector
//
// *@returns {vector}*
MathLib.extendPrototype('vector', 'negative', function () {
  return this.map(MathLib.negative);
});