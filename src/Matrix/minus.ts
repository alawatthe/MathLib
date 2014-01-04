/**
 * Calculates the difference of two matrices
 *
 * @param {Matrix} subtrahend The matrix to be subtracted.  
 * @return {Matrix}
 */
minus(subtrahend) {
	if (this.rows === subtrahend.rows && this.cols === subtrahend.cols) {
		return this.plus(subtrahend.negative());
	}
	else {
		MathLib.error({message: 'Matrix sizes not matching', method: 'Matrix#minus'});
		return;
	}
}