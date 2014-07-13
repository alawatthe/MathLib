/**
 * Determines if the matrix is a band matrix.
 *
 * @param {number} l The wished lower bandwidth
 * @param {number} u The wished upper bandwidth
 * @return {boolean}
 */
isBandMatrix(l : number, u : number) : boolean {
	// var i, j, ii, jj;

	if (arguments.length === 1) {
		u = l;
	}

	return this.every(function (x, i, j) {
		return (i - l <= j && i + u >= j) || MathLib.isZero(x);
	});


	// for (i = 0, ii = this.rows; i < ii; i++) {
	//   for (j = 0, jj = this.cols; j < jj; j++) {
	//     if (i - j < l && this[i][j] !== 0) {
	//       return false;
	//     }
	//   }
	// }
	// return true;
}
