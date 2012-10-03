// ### Permutation.prototype.times()
// Multiplies two permutations
//
// *@returns {permutation}*
MathLib.extendPrototype('permutation', 'times', function (p) {
  var a = this;
  return p.map(function (x) {
    return a[x];
  });
});