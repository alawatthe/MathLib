// ### Matrix.zero()
// Returns a matrix consisting completely of zeros.
//
// *@param {number}* The number of rows.  
// *@param {number}* The number of columns.  
// *@return {Matrix}*
static zero = function (r, c) : Matrix {
	r = r || 1;
	c = c || 1;
	return MathLib.Matrix.numbers(0, r, c);
};