/**
 * Determines if the matrix is invertible.
 *
 * @return {boolean}
 */
isInvertible() : boolean {
	return this.isSquare() && this.rank() === this.rows;
}