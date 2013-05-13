// ### Matrix.prototype.minus()
// Calculates the difference of two matrices
//
// *@param {Matrix}* The matrix to be subtracted.  
// *@return {Matrix}*
minus(m) {
	return this.plus(m.negative());
}