/**
 * QR decomposition with the givens method.
 *
 * @return {[Matrix, Matrix]}
 */
givens() {
	var rows = this.rows,
			cols = this.cols,
			R = this.copy(),
			Q = MathLib.Matrix.identity(rows),
			c, s, rho, i, j, k, ri, rj, qi, qj;

	for (i = 0; i < cols; i++) {
		for (j = i + 1; j < rows; j++) {

			if (!MathLib.isZero(R[j][i])) {
				// We can't use the sign function here, because we want the factor
				// to be 1 if A[i][i] is zero.
				rho = (R[i][i] < 0 ? -1 : 1) * MathLib.hypot(R[i][i],  R[j][i]);
				c   = R[i][i] / rho;
				s   = R[j][i] / rho;

				// Apply the rotation
				ri = [];
				rj = [];
				qi = [];
				qj = [];

				// Multiply to R
				for (k = 0; k < cols; k++) {
					ri.push(R[i][k]);
					rj.push(R[j][k]);
				}
				for (k = 0; k < cols; k++) {
					R[i][k] = rj[k] * s + ri[k] * c;
					R[j][k] = rj[k] * c - ri[k] * s;
				}

				// Multiply to Q
				for (k = 0; k < rows; k++) {
					qi.push(Q[k][i]);
					qj.push(Q[k][j]);
				}
				for (k = 0; k < rows; k++) {
					Q[k][i] =  qi[k] * c + qj[k] * s;
					Q[k][j] = -qi[k] * s + qj[k] * c;
				}
			}
		}
	}

	return [Q, R];
}
