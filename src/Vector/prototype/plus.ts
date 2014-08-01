/**
 * Calculates the sum of two vectors.
 *
 * @param {Vector} v The vector to add to the current vector.
 * @return {Vector}
 */
plus(v : Vector) : Vector {
	if (this.length === v.length) {
		return new MathLib.Vector(this.map(function (x, i) {
			return MathLib.plus(x, v[i]);
		}));
	}
	else {
		throw new MathLib.EvaluationError('Vector sizes not matching', {method: 'Vector#plus'});
	}
}
