// ### Permutation.prototype.sgn()
// Calculates the signum of the permutation
//
// *@returns {number}*
sgn() {
  var count = 0, i;
  for (i = 0; i < this.cycle.length; i++) {
    count += this.cycle[i].length;
  }
  count += this.cycle.length;
  return -2 * (count % 2) + 1;
}