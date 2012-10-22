// ### Permutation.prototype.inverse()
// Calculates the inverse of the permutation
//
// *@returns {permutation}*
inverse() {
  var cycle = this.cycle.slice();
  cycle.reverse().forEach(function (e) {
    e.reverse();
  });
  return new MathLib.Permutation(cycle);
}