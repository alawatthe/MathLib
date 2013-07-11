// ### Matrix.prototype.minus()
// Calculates the difference of two matrices
//
// *@param {Matrix}* The matrix to be subtracted.  
// *@return {Matrix}*
minus(m) {
	if (this.rows === m.rows && this.cols === m.cols) {
		return this.plus(m.negative());
	}
	else {
		MathLib.error({message: 'Matrix sizes not matching', method: 'Matrix#minus'});
		return;
	}
}