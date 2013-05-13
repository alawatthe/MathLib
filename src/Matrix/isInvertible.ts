// ### Matrix.prototype.isInvertible()
// Determines if the matrix is invertible.
//
// *@return {boolean}*
isInvertible() {
	return this.isSquare() && this.rank() === this.rows;
}