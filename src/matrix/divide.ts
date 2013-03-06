// ### Matrix.prototype.divide()
// Multiplies the matrix by the inverse of a number or a matrix
//
// *@returns {Matrix}*
divide(n : any) : Matrix {
	return this.times(MathLib.inverse(n));
}