// ### Matrix.prototype.inverse()
// Calculates the inverse matrix.
//
// *@return {Matrix}*
// TODO: optimize this calculation. But hey, you shouldn't use inverse anyway ;-)
inverse() {
	if (!this.isSquare() && this.determinant()) {
		return;
	}
	return this.adjugate().divide(this.determinant());
}