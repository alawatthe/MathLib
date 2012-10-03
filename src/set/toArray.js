// ### Set.prototype.toArray()
// Converts the set to an array
//
// *@returns {array}*
MathLib.extendPrototype('set', 'toArray', function () {
  return this.slice();
});