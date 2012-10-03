// ### Set.prototype.isEmpty()
// Determines if the set is empty.
//
// *@returns {boolean}*
MathLib.extendPrototype('set', 'isEmpty', function () {
  return this.card === 0;
});