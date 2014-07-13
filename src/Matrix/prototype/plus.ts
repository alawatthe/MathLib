/**
 * This function adds a matrix to the current matrix
 * and returns the result as a new matrix.
 *
 * @param {Matrix} summand The matrix to be added.  
 * @return {Matrix}
 */
plus(summand) {
	var i, ii, j, jj,
			sum = [];

	if (this.rows === summand.rows && this.cols === summand.cols) {
		for (i = 0, ii = this.rows; i < ii; i++) {
			sum[i] = [];
			for (j = 0, jj = this.cols ; j < jj; j++) {
				sum[i][j] = MathLib.plus(this[i][j], summand[i][j]);
			}
		}
		return new MathLib.Matrix(sum);
	}
	else {
		throw MathLib.EvaluationError('Matrix sizes not matching', {method: 'Matrix.prototype.plus'});
	}
}
