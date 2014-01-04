/**
 * Decides if two polynomials are equal.
 *
 * @param {Polynomial} p The polynomial to compare.
 * @return {boolean}
 */
isEqual(p : Polynomial) : boolean {
	var i, ii;
	if (this.deg !== p.deg || this.subdeg !== p.subdeg) {
		return false;
	}
	for (i = 0, ii = this.deg; i <= ii; i++) {
		if (!MathLib.isEqual(this[i], p[i])) {
			return false;
		}
	}
	return true;
}