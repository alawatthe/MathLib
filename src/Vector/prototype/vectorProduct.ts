/**
 * Calculates the vector product of two vectors.
 *
 * @param {Vector} v The second vector to calculate the vector product with.
 * @return {Vector}
 */
vectorProduct(v : Vector) : Vector {
	/* TODO: Implement vectorproduct for non three-dimensional vectors */
	if (this.length === 3 && v.length === 3) {
		return new MathLib.Vector([
			MathLib.minus(MathLib.times(this[1], v[2]), MathLib.times(this[2], v[1])),
			MathLib.minus(MathLib.times(this[2], v[0]), MathLib.times(this[0], v[2])),
			MathLib.minus(MathLib.times(this[0], v[1]), MathLib.times(this[1], v[0]))
		]);
	}
	else {
		throw new MathLib.EvaluationError('Vectors are not three-dimensional', {method: 'Vector.prototype.vectorProduct'});
	}
}
