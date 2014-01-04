/**
 * Determines if the matrix is symmetric
 *
 * @return {boolean}
 */
isSymmetric() : boolean {
	var i, ii, j, jj,
			isSymmetric = true;

	if (!this.isSquare()) {
		isSymmetric = false;
	}
	else {
lp: for (i = 0, ii = this.rows; i < ii; i++) {
			for (j = i + 1, jj = this.cols; j < jj; j++) {
				if (!MathLib.isEqual(this[i][j], this[j][i])) {
					isSymmetric = false;
					break lp;
				}
			}
		}
	}

	this.isSymmetric = function () {
		return isSymmetric;
	};
	return isSymmetric;
}