// ### Matrix.prototype.plus()
// This function adds a matrix to the current matrix
// and returns the result as a new matrix.
//
// *@param {Matrix}* The matrix to be added.  
// *@return {Matrix}*
plus(m) {
	var i, ii, j, jj,
			sum = [];

	for (i = 0, ii = this.rows; i < ii; i++) {
		sum[i] = [];
		for (j = 0, jj = this.cols ; j < jj; j++) {
			sum[i][j] = MathLib.plus(this[i][j], m[i][j]);
		}
	}
	return new MathLib.Matrix(sum);
}