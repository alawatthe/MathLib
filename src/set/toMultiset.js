// ### Set.prototype.toMultiset()
// Converts a set to a multiset
//
// *@returns {set}*
MathLib.extendPrototype('set', 'toMultiset', function () {
  return MathLib.set(this.toArray(), true);
});