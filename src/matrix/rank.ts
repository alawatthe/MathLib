// ### Matrix.prototype.rank()
// Determines the rank of the matrix
//
// *@returns {number}*
rank() {
	var rank = 0, mat, i, ii, j;
	mat = this.rref();

	label: for (i = Math.min(this.rows, this.cols)-1; i>=0; i--) {
		for (j=this.cols-1; j>=i; j--) {
			if (!MathLib.isZero(mat[i][j])) {
				rank = i + 1;
				break label;
			}
		}
	}

	this.rank = function () {
		return rank;
	};
	return rank;
}