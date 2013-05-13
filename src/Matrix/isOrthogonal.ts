// ### Matrix.prototype.isOrthogonal()
// Determines if the matrix is a orthogonal.
//
// *@return {boolean}*
isOrthogonal() {
	return this.transpose().times(this).isIdentity();
}