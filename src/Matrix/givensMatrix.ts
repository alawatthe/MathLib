/**
 * This function returns a givens matrix
 *
 * @param {number} n The size of the matrix.  
 * @param {number} i The first row/column.  
 * @param {number} k The second row/column.  
 * @param {number} phi The angle (in radians).  
 * @return {Matrix}
 */
static givensMatrix = function (n, i, k, phi) {
	var givens = MathLib.Matrix.identity(n);
	givens[k][k] = givens[i][i] = Math.cos(phi);
	givens[i][k] = Math.sin(phi);
	givens[k][i] = -givens[i][k];
	return givens;
};