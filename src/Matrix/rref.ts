/**
 * Calculate the reduced row echelon form (rref) of a matrix.
 *
 * @return {Matrix}
 */
rref() {
	var i, ii, j, jj, k, kk, pivot, factor, swap,
			lead = 0,
			rref = this.toArray();

	for (i = 0, ii = this.rows; i < ii; i++) {
		if (this.cols <= lead) {
			return new MathLib.Matrix(rref);
		}

		// Find the row with the biggest pivot element
		j = i;
		while (rref[j][lead] === 0) {
			j++;
			if (this.rows === j) {
				j = i;
				lead++;
				if (this.cols === lead) {
					return new MathLib.Matrix(rref);
				}
			}
		}

		// Swap the pivot row to the top 
		if (i !== j) {
			swap = rref[j];
			rref[j] = rref[i];
			rref[i] = swap;
		}

		pivot = rref[i][lead];

		// Divide the pivot row by the pivot element
		for (j = lead, jj = this.cols; j < jj; j++) {
			rref[i][j] /= pivot;
		}

		// Reduce the other rows with the pivot row
		for (j = 0, jj = this.rows; j < jj; j++) {
			if (j === i) {
				continue;
			}
			factor = rref[j][lead];
			for (k = 0, kk = this.cols; k < kk; k++) {
				rref[j][k] = MathLib.minus(rref[j][k], MathLib.times(factor, rref[i][k]));
			}
		}
		lead++;
	}
	return new MathLib.Matrix(rref);
}