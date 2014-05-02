/**
 * Calculates the outer product of two vectors.
 *
 * @param {Vector} v The second vector to calculate the outer product with. 
 * @return {Matrix}
 */
outerProduct(v : Vector) : Matrix {
	return new MathLib.Matrix(this.map(function (x) {
		return v.map(function (y) {
			return MathLib.times(x, y);
		});
	}));
}