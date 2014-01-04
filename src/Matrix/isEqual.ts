/**
 * Determines if the matrix is equal to an other matrix.
 *
 * @param {Matrix} matrix The matrix to compare with  
 * @return {boolean}
 */
isEqual(matrix) : boolean {
	var i, j, ii, jj;
	if (this === matrix) {
		return true;
	}
	if (this.rows === matrix.rows && this.cols === matrix.cols) {
		for (i = 0, ii = this.rows; i < ii; i++) {
			for (j = 0, jj = this.cols; j < jj; j++) {
				if (!MathLib.isEqual(this[i][j], matrix[i][j])) {
					return false;
				}
			}
		}
		return true;
	}
	return false;
}