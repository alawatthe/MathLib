/**
 * Determines if the matrix is a permutation matrix
 *
 * @return {boolean}
 */
isPermutation() : boolean {
	var rows = [],
			cols = [];

	return this.every(function (x, r, c) {
		if (MathLib.isOne(x)) {
			if (rows[r] || cols[c]) {
				return false;
			}
			else {
				rows[r] = true;
				cols[c] = true;
				return true;
			}
		}
		else if (MathLib.isZero(x)) {
			return true;
		}
		return false;
	}) && rows.length === this.rows && cols.length === this.cols;
}