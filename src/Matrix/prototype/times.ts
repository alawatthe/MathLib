/**
 * Multiplies the current matrix with a number, a matrix, a point or a vector.
 *
 * @param {number|Matrix|Point|Rational|Vector} a The object to multiply to the current matrix
 * @return {Matrix|Point|Vector}
 */
times(a) {
	var i, ii, j, jj, k, kk,
			product = [], entry;

	if (a.type === 'rational') {
		a = a.coerceTo('number');
	}
	if (typeof a === 'number' || a.type === 'complex') {
		return this.map(function (x) {
			return MathLib.times(x, a);
		});
	}

	else if (a.type === 'matrix') {
		if (this.cols === a.rows) {
			for (i = 0, ii = this.rows; i < ii; i++) {
				product[i] = [];
				for (j = 0, jj = a.cols; j < jj; j++) {
					entry = 0;

					for (k = 0, kk = this.cols; k < kk; k++) {
						entry = MathLib.plus(entry, MathLib.times(this[i][k], a[k][j]));
					}
					product[i][j] = entry;
				}
			}
			return new MathLib.Matrix(product);
		}
		else {
			throw MathLib.EvaluationError('Matrix sizes not matching', {method: 'Matrix#times'});
		}
	}

	else if (a.type === 'point' || a.type === 'vector') {
		if (this.cols === a.length) {
			for (i = 0, ii = this.rows; i < ii; i++) {
				entry = 0;
				for (j = 0, jj = this.cols; j < jj; j++) {
					entry = MathLib.plus(entry, MathLib.times(this[i][j], a[j]));
				}
				product.push(entry);
			}
			return new a.constructor(product);
		}
	}
}
