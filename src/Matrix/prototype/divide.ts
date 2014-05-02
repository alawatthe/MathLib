/**
 * Multiplies the matrix by the inverse of a number or a matrix
 *
 * @return {Matrix|number} n The number or Matrix to be inverted and multiplied
 */
divide(n : any) : Matrix {
	return this.times(MathLib.inverse(n));
}