/**
 * Determines if the matrix is a diagonal matrix.
 *
 * @return {boolean}
 */
isDiag() : boolean {
	var i, j, ii, jj;
	if (Number(this.hasOwnProperty('isUpper') && this.isUpper()) +
			Number(this.hasOwnProperty('isLower') && this.isLower()) +
			Number(this.hasOwnProperty('isSymmetric') && this.isSymmetric()) > 1) {
		return true;
	}
	for (i = 0, ii = this.rows; i < ii; i++) {
		for (j = 0, jj = this.cols; j < jj; j++) {
			if (i !== j && !MathLib.isZero(this[i][j])) {
				return false;
			}
		}
	}
	return true;
}