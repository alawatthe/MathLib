/**
 * Returns the identity matrix.
 *
 * @param {number} n The number of rows and columns.  
 * @return {Matrix}
 */
static identity = function (n : number) : Matrix {
	var row = [],
			matrix = [],
			i, ii;
	n = n || 1;

	for (i = 0, ii = n - 1; i < ii; i++) {
		row.push(0);
	}
	row.push(1);
	row = row.concat(row);
	row = row.slice(0, -1);

	for (i = 0, ii = n; i < ii; i++) {
		matrix.push(row.slice(n - i - 1, 2 * n - i - 1));
	}

	return new MathLib.Matrix(matrix);
};