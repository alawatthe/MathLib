/**
 * Calculates the difference of two vectors.
 *
 * @param {Vector} v The vector to be subtracted.
 * @return {Vector}
 */
minus(v : Vector) : Vector {
	if (this.length === v.length) {
		return this.plus(v.negative());
	}
	else {
		throw new MathLib.EvaluationError('Vector sizes not matching', {method: 'Vector#minus'});
	}
}
