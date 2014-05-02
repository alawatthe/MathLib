/**
 * Determines if the matrix is a orthogonal.
 *
 * @return {boolean}
 */
isOrthogonal() : boolean {
	return this.transpose().times(this).isIdentity();
}