/**
 * Calculates the LU decomposition of a matrix
 * The result is cached.
 *
 * @return {Matrix}
 */
LU() {
	var i, j, k, t, p,
			LU = this.toArray(),
			m = this.rows,
			n = this.cols,
			permutation = [];

	for (k = 0; k < n; k++) {
		// Find the pivot
		p = k;
		for (i = k + 1; i < m; i++) {
			if (Math.abs(LU[i][k]) > Math.abs(LU[p][k])) {
				p = i;
			}
		}
		// Exchange if necessary
		if (p !== k) {
			permutation.unshift([p, k]);
			t = LU[p]; LU[p] = LU[k]; LU[k] = t;
		}


		// The elimination
		if (LU[k][k] !== 0) {
			for (i = k + 1; i < m; i++) {
				LU[i][k] = MathLib.divide(LU[i][k], LU[k][k]);
				for (j = k + 1; j < n; j++) {
					LU[i][j] = MathLib.minus(LU[i][j], MathLib.times(LU[i][k], LU[k][j]));
				}
			}
		}
	}
	LU = new MathLib.Matrix(LU);
	this.LU = function () {
		return LU;
	};
	this.LUpermutation = new MathLib.Permutation(permutation);
	return LU;
}