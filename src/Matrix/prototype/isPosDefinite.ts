/**
 * Determines if the matrix is positive definite
 *
 * @return {boolean}
 */
isPosDefinite() : boolean {
	if (!this.isSquare()) {
		return;
	}
	if (this.rows === 1) {
		return this[0][0] > 0;
	}
	// Sylvester's criterion
	return this.determinant() > 0 && this.remove(this.rows - 1, this.cols - 1).isPosDefinite();
}