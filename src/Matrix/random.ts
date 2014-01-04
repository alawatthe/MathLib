/**
 * Returns a matrix consisting completely of random numbers between 0 and 1
 *
 * @param {number} r The number of rows.  
 * @param {number} c The number of columns.  
 * @return {Matrix}
 */
static random = function (r : number, c : number) {
	var row,
			matrix = [],
			i, j, ii, jj;
	for (i = 0, ii = r || 1; i < ii; i++) {
		row = [];
		for (j = 0, jj = c || r || 1; j < jj; j++) {
			row.push(Math.random());
		}
		matrix.push(row);
	}
	return new MathLib.Matrix(matrix);
};