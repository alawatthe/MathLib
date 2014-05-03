/**
 * Interpolates points.
 *
 * @return {Polynomial}
 */
static interpolation(a, b) {
	var basisPolynomial,
			interpolant = new MathLib.Polynomial([0]),
			n = a.length,
			i, j;

	if (arguments.length === 2) {
		a = a.map(function (x, i) {
			return [x, b[i]];
		});
	}

	for (i = 0; i < n; i++) {
		basisPolynomial = new MathLib.Polynomial([1]);
		for (j = 0; j < n; j++) {
			if (i !== j) {
				basisPolynomial = basisPolynomial.times(
					new MathLib.Polynomial([-a[j][0] / (a[i][0] - a[j][0]), 1 / (a[i][0] - a[j][0])])
					);
			}
		}
		interpolant = interpolant.plus(basisPolynomial.times(a[i][1]));
	}
	return interpolant;
}