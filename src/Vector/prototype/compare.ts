/**
 * Compares two vectors.
 *
 * @param {Vector} v The vector to compare  
 * @return {number}
 */
compare(v : Vector) : number {
	var i, ii;

	if (this.length !== v.length) {
		return MathLib.sign(this.length - v.length);
	}

	for (i = 0, ii = this.length; i < ii; i++) {
		if (v[i] - this[i]) {
			return MathLib.sign(this[i] - v[i]);
		}
	}

	return 0;
}