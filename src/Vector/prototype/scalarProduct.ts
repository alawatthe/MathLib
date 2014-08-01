/**
 * Calculates the scalar product of two vectors.
 *
 * @param {Vector} v The second vector to calculate the scalar product with.
 * @return {number|Complex}
 */
scalarProduct(v : Vector) : any {
	if (this.length === v.length) {
		return this.reduce(function (old, cur, i, w) {
			return MathLib.plus(old, MathLib.times(w[i], v[i]));
		}, 0);
	}
	else {
		throw new MathLib.EvaluationError('Vector sizes not matching', {method: 'Vector#scalarProduct'});
	}
}
