/**
 * Calculating the transpose of the matrix
 * The result is cached.
 *
 * @return {Matrix}
 */
transpose() : Matrix {
	var transposedMatrix, row, i, j, ii, jj,
			transpose = [];

	for (i = 0, ii = this.cols; i < ii; i++) {
		row = [];
		for (j = 0, jj = this.rows; j < jj; j++) {
			row.push(this[j][i]);
		}
		transpose.push(row);
	}

	transposedMatrix = new MathLib.Matrix(transpose);
	this.transpose = function () {
		return transposedMatrix;
	};
	return transposedMatrix;
}