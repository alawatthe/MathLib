/**
 * Integrates the polynomial
 *
 * @param {number} n The number of times to integrate the polynomial.  
 * @return {Polynomial}
 */
integrate(n = 1) : Polynomial {
	var i, ii,
			antiderivative = [];

	if (MathLib.isZero(n)) {
		return this;
	}

	for (i = 0; i < n; i++) {
		antiderivative.push(0);
	}

	for (i = 0, ii = this.deg; i <= ii; i++) {
		antiderivative[i + n] = this[i] / MathLib.fallingFactorial(i + n, n);
	}
	return new MathLib.Polynomial(antiderivative);
}