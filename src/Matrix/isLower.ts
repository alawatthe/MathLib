// ### Matrix.prototype.isLower()
// Determines if the matrix is a lower triangular matrix.
//
// *@return {boolean}*
isLower() {
	return this.slice(0, -1).every(function (x, i) {
		return x.slice(i + 1).every(MathLib.isZero);
	});
}