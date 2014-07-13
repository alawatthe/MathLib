/**
 * Multiplies the polynomial by a number or an other polynomial
 *
 * @param {number|Polynomial} a The multiplicator
 * @return {Polynomial}
 */
times(a) : Polynomial {
	var i, ii, j, jj,
			product = [];

	if (a.type === 'polynomial') {
		for (i = 0, ii = this.deg; i <= ii; i++) {
			for (j = 0, jj = a.deg; j <= jj; j++) {
				product[i + j] = MathLib.plus((product[i + j] ? product[i + j] : 0), MathLib.times(this[i], a[j]));
			}
		}
		return new MathLib.Polynomial(product);
	}
	else if (a.type === 'rational') {
		a = a.coerceTo('number');
	}
  // we we multiply it to every coefficient
	return this.map(b => MathLib.times(a, b));
}
