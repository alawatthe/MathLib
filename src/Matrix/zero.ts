/**
 * Returns a matrix consisting completely of zeros.
 *
 * @param {number} r The number of rows.  
 * @param {number} c The number of columns.  
 * @return {Matrix}
 */
static zero = function (r = 1, c = r) : Matrix {
	return MathLib.Matrix.numbers(0, r, c);
};