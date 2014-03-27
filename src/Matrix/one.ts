/**
 * Returns a matrix consisting completely of ones.
 *
 * @param {number} r The number of rows.  
 * @param {number} c The number of columns.  
 * @return {Matrix}
 */
static one = function (r = 1, c = r) {
	return MathLib.Matrix.numbers(1, r, c);
};