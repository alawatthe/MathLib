// ### Permutation.prototype.times()
// Multiplies two permutations
//
// *@returns {permutation}*
times(p) {
  var a = this;
  return p.map(function (x) {
    return a[x];
  });
}