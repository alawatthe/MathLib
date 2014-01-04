/**
 * Calculates the inverse of the permutation
 *
 * @return {Permutation}
 */
inverse() : Permutation {
	var cycle = this.cycle.slice(0);
	cycle.reverse().forEach(function (e) {
		e.reverse();
	});
	return new MathLib.Permutation(cycle);
}