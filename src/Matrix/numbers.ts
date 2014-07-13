/**
 * Returns a matrix consisting completely of a given number
 *
 * @param {number} n The number.
 * @param {number} r The number of rows.
 * @param {number} c The number of columns.
 * @return {Matrix}
 */
static numbers = function (n, r : number, c : number) {
	var i, ii,
			row = [],
			matrix = [];

	for (i = 0, ii = c || r || 1; i < ii; i++) {
		row.push(n);
	}
	for (i = 0, ii = r || 1; i < ii ; i++) {
		matrix.push(row.slice(0));
	}
	return new MathLib.Matrix(matrix);
};
