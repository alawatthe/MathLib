// ### Vector.prototype.toArray()
// Converts the vector to an Array
//
// *@returns {array}*
MathLib.extendPrototype('vector', 'toArray', function () {
  return this.slice();
});