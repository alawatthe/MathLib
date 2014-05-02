/**
 * Determines if the matrix is a scalar matrix
 * (that is a multiple of the identity matrix)
 *
 * @return {boolean}
 */
isScalar() : boolean {
	var i, ii,
			diag = this.diag;
	if (this.hasOwnProperty('isIdentity') && this.hasOwnProperty('isZero')) {
		if (this.isIdentity() || this.isZero()) {
			return true;
		}
		else {
			return false;
		}
	}
	if (this.isDiag()) {
		for (i = 1, ii = this.rows; i < ii; i++) {
			if (!MathLib.isEqual(diag[0], diag[i])) {
				return false;
			}
		}
		return true;
	}
	return false;
}