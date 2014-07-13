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
		throw MathLib.EvaluationError('Matrix sizes not matching', {method: 'Matrix.prototype.minus'});
	}
}
