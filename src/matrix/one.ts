// ### Matrix.one()
// Returns a matrix consisting completely of ones.
//
// *@param {number}* The number of rows.  
// *@param {number}* The number of columns.  
// *@returns {matrix}*
static one = function (r, c) {
  r = r || 1;
  c = c || 1;
  return MathLib.Matrix.numbers(1, r, c);
};