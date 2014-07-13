/**
 * Calculates the inverse matrix.
 *
 * @return {Matrix}
 */
inverse() {
	var i, ii, res, inverse,
			col = [],
			matrix = [],
			n = this.rows;

	if (!this.isSquare()) {
		throw MathLib.EvaluationError('Inverse of non square matrix', {method: 'Matrix.prototype.inverse'});
	}

	for (i = 0, ii = n - 1; i < ii; i++) {
		matrix.push([]);
		col.push(0);
	}

	matrix.push([]);

	col.push(1);
	col = col.concat(col).slice(0, -1);

	for (i = 0, ii = n; i < ii; i++) {
		res = this.solve(col.slice(n - i - 1, 2 * n - i - 1));

		if (res === undefined) {
			return;
		}

		res.forEach(function (x, i) {
			matrix[i].push(x);
		});
	}

	inverse = new MathLib.Matrix(matrix);
	this.inverse = function () {
		return inverse;
	};
	return inverse;
}
