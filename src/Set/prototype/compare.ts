/**
 * Compare function for sets
 *
 * @param {Set} x The set to compare the current set to
 * @return {number}
 */
compare(x : Set) : number {
	var a, i, ii;

	if (this.card !== x.card) {
		return MathLib.sign(this.card - x.card);
	}
	else {
		for (i = 0, ii = this.card; i < ii; i++) {
			a = MathLib.compare(this[i], x[i]);
			if (a !== 0) {
				return a;
			}
		}
		return 0;
	}
}