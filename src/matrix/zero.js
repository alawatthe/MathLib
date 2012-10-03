// ### Matrix.zero()
// Returns a matrix consisting completely of zeros.
//
// *@param {number}* The number of rows.  
// *@param {number}* The number of columns.  
// *@returns {matrix}*
MathLib.extend('matrix', 'zero', function (r, c) {
  r = r || 1;
  c = c || 1;
  return MathLib.matrix.numbers(0, r, c);
});