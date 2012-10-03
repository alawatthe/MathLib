// ### Matrix.random()
// Returns a matrix consisting completely of random numbers between 0 and 1
//
// *@param {number}* The number of rows.
// *@param {number}* The number of columns.
// *@returns {matrix}*
MathLib.extend('matrix', 'random', function (r, c) {
  var temp, arr = [],
      i, j, ii, jj;
  for (i = 0, ii = r || 1; i < ii; i++) {
    temp = [];
    for (j = 0, jj = c || r || 1; j < jj; j++) {
      temp.push(Math.random());
    }
    arr.push(temp);
  }
  return MathLib.matrix(arr);
});