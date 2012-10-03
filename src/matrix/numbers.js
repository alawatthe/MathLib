// ### Matrix.numbers()
// Returns a matrix consisting completely of a given number
//
// *@param {number}* The number.  
// *@param {number}* The number of rows.  
// *@param {number}* The number of columns.  
// *@returns {matrix}*
MathLib.extend('matrix', 'numbers', function (n, r, c) {
  var help = [], res = [],
      i, ii;
  for (i = 0, ii = c || r || 1; i < ii; i++) {
    help.push(n);
  }
  for (i = 0, ii = r || 1; i < ii ; i++) {
    res.push(help.slice());
  }
  return MathLib.matrix(res);
});