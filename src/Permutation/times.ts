/**
 * Multiplies two permutations
 *
 * @param {Permutation} p The permutation to multiply
 * @return {Permutation}
 */
times(p : Permutation) : Permutation {
	var a = this;
	return p.map(function (x) {
		return a[x];
	});
}