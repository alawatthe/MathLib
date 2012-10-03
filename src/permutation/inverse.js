// ### Permutation.prototype.inverse()
// Calculates the inverse of the permutation
//
// *@returns {permutation}*
MathLib.extendPrototype('permutation', 'inverse', function () {
  var cycle = this.cycle.slice();
  cycle.reverse().forEach(function (e) {
    e.reverse();
  });
  return MathLib.permutation(cycle);
});