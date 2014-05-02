/**
 * The cholesky decomposition of a matrix
 * using the Cholesky–Banachiewicz algorithm.
 * Does not change the current matrix, but returns a new one.
 * The result is cached.
 *
 * @return {Matrix}
 */
cholesky() : Matrix {
	var i, ii, j, jj, k, kk, sum, choleskyMatrix,
			cholesky = [];

	for (i = 0, ii = this.rows; i < ii; i++) {
		cholesky.push([]);
	}

	for (i = 0, ii = this.rows; i < ii; i++) {
		for (j = 0; j < i; j++) {
			sum = 0;
			for (k = 0, kk = j; k < kk; k++) {
				sum = MathLib.plus(sum, MathLib.times(cholesky[i][k], cholesky[j][k]));
			}
			cholesky[i][j] = (this[i][j] - sum) / cholesky[j][j];
		}

		sum = 0;
		for (k = 0, kk = j; k < kk; k++) {
			sum = MathLib.plus(sum, MathLib.times(cholesky[i][k], cholesky[i][k]));
		}
		cholesky[i][j] = Math.sqrt(this[j][j] - sum);

		for (j++, jj = this.cols; j < jj; j++) {
			cholesky[i][j] = 0;
		}

	}
	choleskyMatrix = new MathLib.Matrix(cholesky);

	this.cholesky = function () {
		return choleskyMatrix;
	};
	return choleskyMatrix;
}