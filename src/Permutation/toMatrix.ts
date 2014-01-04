/**
 * Converts the permuatation to a matrix.
 *
 * @param {number} n The size of the matrix  
 * @return {Matrix}
 */
toMatrix(n : number) : Matrix {
	var row = [],
			matrix = [],
			index, i, ii;
			n = n || this.length;

	for (i = 0, ii = n - 1; i < ii; i++) {
		row.push(0);
	}
	row = row.concat([1]).concat(row);
	for (i = 0, ii = n; i < ii; i++) {
		index = n - this.applyTo(i) - 1;
		matrix.push(row.slice(index, index + n));
	}
	return new MathLib.Matrix(matrix);
}