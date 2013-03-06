// ### Matrix.prototype.isUpper()
// Determines if the matrix is a upper triangular matrix
//
// *@returns {boolean}*
isUpper() {
	return this.slice(1).every(function (x, i) {
		return x.slice(0, i+1).every(MathLib.isZero);
	});
}