// ### Matrix.one()
// Returns a matrix consisting completely of ones.
//
// *@param {number}* The number of rows.  
// *@param {number}* The number of columns.  
// *@returns {matrix}*
MathLib.extend('matrix', 'one', function (r, c) {
  r = r || 1;
  c = c || 1;
  return MathLib.matrix.numbers(1, r, c);
});