// ### Permutation.cycleToList()
// Converts a cycle representation to a list representation
// 
// *@param{array}* cycle The cycle to be converted  
// *@returns {array}*
MathLib.extend('permutation', 'cycleToList', function (cycle) {
  var index, res = [],
      cur, i, ii, j, jj, max;

  max = cycle.map(function (b) {
    return Math.max.apply(null, b);
  });
  max = Math.max.apply(null, max);

  for (i=0, ii=max; i<=ii; i++) {
    cur = i;
    for (j = 0, jj = cycle.length; j < jj; j++) {
      index = cycle[j].indexOf(cur);
      if (++index) {
        cur = cycle[j][index % cycle[j].length];
      }
    }
    res.push(cur);
  }
  return res;
});