/**
 * Compares two polynomials.
 *
 * @param {Polynomial} p The polynomial to compare  
 * @return {number}
 */
compare(p : Polynomial) : number {
	var i, ii;

	if (this.length !== p.length) {
		return MathLib.sign(this.length - p.length);
	}

	for (i = 0, ii = this.length; i < ii; i++) {
		if (p[i] - this[i]) {
			return MathLib.sign(this[i] - p[i]);
		}
	}

	return 0;
}