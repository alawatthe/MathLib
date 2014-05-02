/**
 * Determines the rank of the matrix
 *
 * @return {number}
 */
rank() {
	var i, j,
			rank = 0,
			mat = this.rref();

	rankloop: for (i = Math.min(this.rows, this.cols) - 1; i >= 0; i--) {
		for (j = this.cols - 1; j >= i; j--) {
			if (!MathLib.isZero(mat[i][j])) {
				rank = i + 1;
				break rankloop;
			}
		}
	}

	this.rank = function () {
		return rank;
	};
	return rank;
}