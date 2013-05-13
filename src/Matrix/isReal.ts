// ### Matrix.prototype.isReal()
// Determines if the matrix has only real entries
//
// *@return {boolean}*
isReal() {
	return this.every(MathLib.isReal);
}