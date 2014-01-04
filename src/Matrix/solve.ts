/**
 * Solves the system of linear equations Ax = b
 * given by the matrix A and a vector or point b.
 *
 * @param {Vector} b The b in Ax = b  
 * @return {Vector}
 */
solve(b) {
	// Ax = b -> LUx = b. Then y is defined to be Ux
	var LU = this.LU(),
			i, j,
			n = b.length,
			x = [],
			y = [];

	// Permutate b according to the LU decomposition
	b = this.LUpermutation.applyTo(b);


	// Forward solve Ly = b
	for (i = 0; i < n; i++) {
		y[i] = b[i];
		for (j = 0; j < i; j++) {
			y[i] = MathLib.minus(y[i], MathLib.times(LU[i][j], y[j]));
		}
	}

	// Backward solve Ux = y
	for (i = n - 1; i >= 0; i--) {
		x[i] = y[i];
		for (j = i + 1; j < n; j++) {
			x[i] = MathLib.minus(x[i], MathLib.times(LU[i][j], x[j]));
		}

		if (LU[i][i] === 0) {
			if (x[i] !== 0) {
				return undefined;
			}
			else {
				x[i] = x[i];
			}
		}
		else {
			x[i] = MathLib.divide(x[i], LU[i][i]);
		}
	}

	if (MathLib.type(b) === 'array') {
		return x;
	}
	else {
		return new b.constructor(x);
	}
}