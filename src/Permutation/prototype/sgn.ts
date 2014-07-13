/**
 * Calculates the signum of the permutation
 *
 * @return {number}
 */
sgn() : number {
	var i, ii,
			count = 0;

	for (i = 0, ii = this.cycle.length; i < ii; i++) {
		count += this.cycle[i].length;
	}
	count += this.cycle.length;
	return -2 * (count % 2) + 1;
}
