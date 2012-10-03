// ### Set.prototype.toSet()
// Converts a multiset to a set
//
// *@returns {set}*
MathLib.extendPrototype('set', 'toSet', function () {
  return MathLib.set(this.toArray());
});