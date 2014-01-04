/**
 * Differentiates the polynomial
 *
 * @param {number} n the number of times to differentiate the polynomial.  
 * @return {Polynomial}
 */
differentiate(n = 1) : Polynomial {
	var i, ii,
			derivative = [];

	if (n === 0) {
		return this;
	}

	for (i = 0, ii = this.deg - n; i <= ii; i++) {
		derivative[i] = MathLib.times(this[i + n], MathLib.fallingFactorial(i + n, n));
	}
	return new MathLib.Polynomial(derivative);
}