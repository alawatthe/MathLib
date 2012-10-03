// ### Permutation.prototype.map()
// Works like Array.prototype.map.
//
// *@returns {permutation}*
MathLib.extendPrototype('permutation', 'map', function (f) {
  return this.constructor(Array.prototype.map.call(this, f));
});