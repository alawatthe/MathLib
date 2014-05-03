/**
 * Compares the matrix to an other matrix.
 *
 * @param {Matrix} m The matrix to compare.  
 * @return {number}
 */
compare(m : Matrix) : number {
	var i, ii, j, jj;

	if (this.rows !== m.rows) {
		return MathLib.sign(this.rows - m.rows);
	}

	if (this.cols !== m.cols) {
		return MathLib.sign(this.cols - m.cols);
	}

	for (i = 0, ii = this.rows; i < ii; i++) {
		for (j = 0, jj = this.cols; j < jj; j++) {
			if (this[i][j] - m[i][j]) {
				return MathLib.sign(this[i][j] - m[i][j]);
			}
		}
	}

	return 0;
}