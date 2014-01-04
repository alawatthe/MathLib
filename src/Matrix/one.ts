/**
 * Returns a matrix consisting completely of ones.
 *
 * @param {number} r The number of rows.  
 * @param {number} c The number of columns.  
 * @return {Matrix}
 */
static one = function (r : number, c : number) {
	r = r || 1;
	c = c || 1;
	return MathLib.Matrix.numbers(1, r, c);
};